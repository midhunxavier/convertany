# ConvertAny

ConvertAny is a free online file converter tool that can convert any input file format to other formats that LibreOffice supports.

## How this works!

#### Rest API Creation using aws lambda and API gateway

Rest api is created with the help of amazon API gateway to process the file.
API gateway is integrated aws lambda function.
This lambda handler written in python to process the api requested file to process.
Processed file stored s3 and this file will be publically visible for 3600seconds.

#### Static website hosting using s3

Created static website using bulma CSS framework. 



This is a serverless apploication completely built on AWS Lambda and S3. This tool was inspired by the [serverless-libreoffice](https://github.com/vladgolubev/serverless-libreoffice) project by [@vladgolubev](https://github.com/vladgolubev).

# Contributors
* [@midhunxavier](https://github.com/midhunxavier/)
* [@devNigel](https://github.com/devNigel)
