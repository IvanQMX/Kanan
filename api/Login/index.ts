import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("Login request.");
  const studentID = req.body && req.body.studentID;
  const password = req.body && req.body.password;
  const responseMessage = studentID
    ? "Hello, " + studentID + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    status: 300,
    body: responseMessage,
  };
};

export default httpTrigger;
