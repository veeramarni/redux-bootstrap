/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../node_modules/immutable/dist/immutable.d.ts" />

interface BoostrapOptions {
    routes: JSX.Element;
    reducers: ReducersOption;
    createHistory?: HistoryModule.CreateHistory<HistoryModule.History>;
    historyOptions?: HistoryModule.HistoryOptions;
    middlewares?: Redux.Middleware[];
    render?: Function;
    initialState?: any;
    container?: string;
}

interface BootstrapResult {
    store: Redux.Store;
    history: ReactRouterRedux.ReactRouterReduxHistory;
    output: any;
    root: JSX.Element;
}

interface ReducersOption {
    [index: string]: Redux.Reducer;
}

interface RootComponentProps {
    store: Redux.Store;
    history: ReactRouterRedux.ReactRouterReduxHistory;
    routes: JSX.Element;
}

interface NodeModule {
    hot: {
        accept: (path: string, cb: () => void) => void;
    };
}
