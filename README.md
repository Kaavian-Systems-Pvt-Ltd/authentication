# authentication

## Description 
This package allows you to generate token using json web token and authentication middleware for all api's.

#STEPS FOR INSTALLING:
In your package.json file in dependencies just paste it

"@kaaviansys/authentication": "https://github.com/Kaavian-Systems-Pvt-Ltd/authentication.git"

after past this in package.json file in dependencies follow this step.

npm install @kaaviansys/authentication.

After installed the package require the package in your file and then you can make use of the functions generateToken() and verifyToken().

# generateToken()

generateToken()-This function need one parameter that is which data you want to generate token, you send that data to this function as a parameter.

Example: generateToken ({'data' : { userName, role, etc...  } });

# verifyToken()

verifyToken()-This function need five parameter they are ignorepaths, token, request, response, next 

ignoepaths : which api path you want to ignore send it as a value in the ignorepaths key,
token: get the token from where you stored it and send that token as a value in the token key,
request: send the request,
response: send the response,
next : send the next.

Example: Send the parameter like this verifyToken({{'ignorePath' : [ '/login' , '/' ] ,'token' : token ,'req' : req ,'res' : res ,'next' : next}})