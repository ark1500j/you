import { prisma } from "@/utils/dbclient";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const contentType = req.headers.get("content-type");
    if (contentType !== "application/x-www-form-urlencoded") {
      return new NextResponse(
        JSON.stringify({ message: "Unsupported Media Type" }),
        {
          status: 415,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse the URL-encoded request body
    const formDataText = await req.text();
    const formData = new URLSearchParams(formDataText);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const { sessionId, serviceCode, phoneNumber, text } = data;
    const textArray = text.split("*");
    const level = textArray.length;

    let response = "";

    const colleges = [
      "Engineering",
      "Science",
      "Social Science",
      "Arts and Builds",
      "Health Sciences",
      "Agriculture and Natural Resources",
    ];

    const departments: Record<string, string[]> = {
      Engineering: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Computer Engineering"],
      Science: ["Mathematics", "Physics", "Chemistry", "Biology"],
      Social Science: ["Sociology", "Psychology", "Political Science", "Geography"],
      Arts and Builds: ["Architecture", "Fine Arts", "Building Technology", "Communication Design"],
      Health Sciences: ["Nursing", "Medicine", "Pharmacy", "Dentistry"],
      Agriculture and Natural Resources: ["Crop Science", "Animal Science", "Agricultural Economics", "Forest Resources"],
    };

    const residences = ["On-Campus", "Ayeduase", "Kotei", "Other"];

    const descriptions = [
      "Depression",
      "Suicidal Thoughts",
      "Schizophrenia",
      "Psychosis",
      "Other",
    ];

    if (text === "") {
      response = `CON Hi welcome. Your mental health is a priority, don't be afraid to seek help\n1. Enter 1 to continue`;
    } else if (text === "1") {
      response = `CON Why are you here today?\n1. Report a case\n2. Suicide Prevention\n3. Telephone Counselling`;
    } else if (text === "1*2") {
      response = `END Please dial +233 24 812 0587 for Suicide Prevention.`;
    } else if (text === "1*3") {
      response = `END Please dial 0322022323 for Telephone Counselling.`;
    } else if (text.startsWith("1*1")) {
      if (level === 2) {
        response = `CON Enter name of victim:`;
      } else if (level === 3) {
        response = `CON Enter victim's phone number:`;
      } else if (level === 4) {
        response = `CON Choose victim's college:\n${colleges
          .map((c, i) => `${i + 1}. ${c}`)
          .join("\n")}`;
      } else if (level === 5) {
        const collegeIndex = parseInt(textArray[4]) - 1;
        const selectedCollege = colleges[collegeIndex];
        const selectedDepartments = departments[selectedCollege];

        response = `CON Choose victim's department:\n${selectedDepartments
          .map((d, i) => `${i + 1}. ${d}`)
          .join("\n")}`;
      } else if (level === 6) {
        response = `CON Choose victim's residence:\n${residences
          .map((r, i) => `${i + 1}. ${r}`)
          .join("\n")}`;
      } else if (level === 7) {
        response = `CON Choose the issue:\n${descriptions
          .map((d, i) => `${i + 1}. ${d}`)
          .join("\n")}`;
      } else if (level === 8) {
        const phone = textArray[3] as string;
        const name = textArray[2] as string;
        const collegeIndex = parseInt(textArray[4]) - 1;
        const selectedCollege = colleges[collegeIndex];
        const departmentIndex = parseInt(textArray[5]) - 1;
        const selectedDepartment = departments[selectedCollege][departmentIndex];
        const residenceIndex = parseInt(textArray[6]) - 1;
        const selectedResidence = residences[residenceIndex];
        const descriptionIndex = parseInt(textArray[7]) - 1;
        const selectedDescription = descriptions[descriptionIndex];
        
        console.log(textArray);
        
        const user = await prisma.patient.create({
          data: {
            college: selectedCollege,
            department: selectedDepartment,
            residence: selectedResidence,
            description: selectedDescription,
            phone,
            name,
            counceler: { connect: { college: selectedCollege } },
          },
        });
        console.log(user);
        
        response = `END Thank you for reporting.`;

      }
    } else {
      response = `END Invalid Choice.`;
    }

    return new NextResponse(response, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error parsing form data:", error);
    return new NextResponse(JSON.stringify({ message: "Invalid form data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
