const deserializeParams = (params: any) => {
    let test: any = {};
    Object.keys(params).map(key => {
        test[key] = JSON.stringify(params[key])?.replace(/\(/gi, "FuckingLeftExpoIssue")?.replace(/\)/gi, "FuckingRightExpoIssue");
    })
    return test;
}
export default deserializeParams;