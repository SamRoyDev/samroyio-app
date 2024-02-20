import json
import boto3
import logging

# Initialize logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize DynamoDB client
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("VisitorCount")


def lambda_handler(event, context):
    try:
        # Initialize the count variable
        count = 0
        # Start the scan operation
        response = table.scan(Select="COUNT")
        count += response.get("Count", 0)
        logger.info(f"Scanned Count: {count}")

        # Continue scanning if there are more items
        while "LastEvaluatedKey" in response:
            response = table.scan(
                Select="COUNT", ExclusiveStartKey=response["LastEvaluatedKey"]
            )
            count += response.get("Count", 0)
            logger.info(f"Scanned Count: {count}")

        # Return the count of visitors
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
            "body": json.dumps({"count": count}),
        }
    except Exception as e:
        logger.error(e)
        # Return the error message
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
            "body": json.dumps("Unable to retrieve count of visitors."),
        }
