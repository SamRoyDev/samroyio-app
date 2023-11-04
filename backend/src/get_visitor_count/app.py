import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('VisitorCount')

def lambda_handler(event, context):
    try:
        # Initialize the count variable
        count = 0
        # Start the scan operation
        response = table.scan(Select='COUNT')
        count += response['Count']

        # Continue scanning if there are more items
        while 'LastEvaluatedKey' in response:
            response = table.scan(
                Select='COUNT',
                ExclusiveStartKey=response['LastEvaluatedKey']
            )
            count += response['Count']

        # Return the count of visitors
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # Required for CORS support to work
                'Access-Control-Allow-Credentials': 'true'  # This should be a string
            },
            'body': json.dumps({'count': count})
        }
    except Exception as e:
        print(e)
        # Return the error message
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # Required for CORS support to work
                'Access-Control-Allow-Credentials': 'true'  # This should be a string
            },
            'body': json.dumps('Unable to retrieve count of visitors.')
        }
