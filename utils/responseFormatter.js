const responseFormatter=(statusCode,success,message,data={})=>
{
    const response={
        statusCode,success,message
    }
    if(Object.keys(data).length>0)
    {
        response.data=data;
    }
    return response;
}