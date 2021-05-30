import awsmobile from "../src/aws-exports";

const awsConfiguration = {
  aws_project_region: awsmobile.aws_project_region,
  aws_appsync_graphqlEndpoint: awsmobile.aws_appsync_graphqlEndpoint,
  aws_appsync_region: awsmobile.aws_appsync_region,
  aws_appsync_authenticationType: awsmobile.aws_appsync_authenticationType,
  aws_appsync_apiKey: awsmobile.aws_appsync_apiKey,
};

export default awsConfiguration;
