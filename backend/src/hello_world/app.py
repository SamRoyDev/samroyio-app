import json

def lambda_handler(event, context):
    # Return a simple "Hello, World!" response
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',  # Required for CORS support to work
            'Access-Control-Allow-Credentials': True  # Required for cookies, authorization headers with HTTPS 
        },
        'body': json.dumps('Hello, World!')
    }
