import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from 'react';




type NotificationState = {
    message?: string

}

type Dispatch = React.Dispatch<Partial<NotificationState>>

const initialNotificationState: NotificationState = {
    message: undefined,
};

const StateContext = createContext<NotificationState>(initialNotificationState);

const DispatchContext = createContext<React.Dispatch<Partial<NotificationState>>>(
    () => { }
);

export const NotificationProvider = (
    { children }: { children: ReactNode }) => {
    const NotificationRef = useRef<any>(null);
    const [notificationState, setNotificationState] = useReducer(
        (state: NotificationState, newState: Partial<NotificationState>) => ({
            ...state,
            ...newState,
        }),
        initialNotificationState
    );

    const handleNotification = () => {
        if (NotificationRef.current) clearTimeout(NotificationRef.current);
        NotificationRef.current = setTimeout(() => {
            if (notificationState.message) {
                setNotificationState({ message: undefined })
            };
        }, 1000);
    };

    useEffect(() => {
        handleNotification()
    }, [notificationState.message])

    console.log('NotificationState', notificationState)
    const memoizedDispatch = useCallback(
        (value: Partial<NotificationState>) => {
            setNotificationState(value);
        }, []);

    const memoizedValue = useMemo(
        () => ({
            ...notificationState
        }),
        [notificationState]
    );

    return (
        <StateContext.Provider value={memoizedValue}>
            <DispatchContext.Provider value={memoizedDispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export const useNotificationState = () => useContext(StateContext)
export const useNotificationDispatch: () => Dispatch = () => useContext(DispatchContext)



