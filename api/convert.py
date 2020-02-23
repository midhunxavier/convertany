import boto3
import os
import json
import base64

s3_bucket = boto3.resource("s3").Bucket("EnterBucketNameHere")
os.system("curl https://s3.amazonaws.com/EnterBucketNameHere/lo.tar.gz -o /tmp/lo.tar.gz && cd /tmp && tar -xf /tmp/lo.tar.gz")
def convert_command(extension):
  convertCommand = "instdir/program/soffice --headless --invisible --nodefault --nofirststartwizard --nolockcheck --nologo --norestore --convert-to "+extension+" --outdir /tmp"
  return convertCommand
  
def lambda_handler(event,context):
  inputFileName = ''.join(e for e in event['filename'] if e.isalnum())
  extension = event['extension']
  file_content = base64.b64decode(event['body'])
  s3_bucket.put_object(Key="tmp/orginal/"+inputFileName,Body=file_content,ACL="public-read") 
  with open(f'/tmp/{inputFileName}', 'wb') as data:
      s3_bucket.download_fileobj("tmp/orginal/"+inputFileName, data)

  convertCommand = convert_command(extension)
  # Execute libreoffice to convert input file
  os.system(f"cd /tmp && {convertCommand} {inputFileName}")

  # Save converted object in S3
  outputFileName, _ = os.path.splitext(inputFileName)
  outputFileName = outputFileName+"."+extension
  f = open(f"/tmp/{outputFileName}","rb")
  s3_bucket.put_object(Key="tmp/converted/"+outputFileName,Body=f,ACL="public-read",ExpiresIn=3600)
  f.close() 
  return {
        'statusCode': 200,
        'body':"https://EnterBucketNameHere.s3.amazonaws.com/tmp/converted/"+outputFileName
    }