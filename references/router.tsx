import deserializeParams from "../modules/params/deserializeParams";
import serializeParams from "../modules/params/serializeParams";
import navigationRef from "./navigationRef";
import { router as expoRouter } from "expo-router";
const expoRouterFromAnyType: any = expoRouter;

const router = {
    navigate:  ({pathname, params = {}}: {pathname: keyof routeType, params?: any}) => {
        expoRouterFromAnyType.push({ pathname: pathname, params: deserializeParams(params) });
    },
    replace:  ({pathname, params = {}}: {pathname: keyof routeType, params?: any}) => {
        expoRouterFromAnyType.replace({ pathname: pathname, params: deserializeParams(params) });
    },
    reset: ({pathname, params = {}}: {pathname: keyof routeType, params?: any}) => {
        navigationRef?.current?.reset({routes: [{name: pathname, params: deserializeParams(params)}]});
    },
    goBack: () => {
        if( expoRouter.canGoBack()){
            expoRouter.back();
        }
    }
}
export default router;