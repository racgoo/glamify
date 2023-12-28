const serializeParams = (params: any = {}) => {
    let test: any = {};
    Object.keys(params)?.map(key => {
        let parsed: any;
        try{
            parsed = JSON.parse(params[key]?.replace(/FuckingLeftExpoIssue/gi, "(")?.replace(/FuckingRightExpoIssue/gi, ")"))
        }catch(e){
            parsed = params[key];
        }
        test[key] = parsed;

    })
    return test;
}
export default serializeParams;