import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"



export type TodoItem = {
    id: string,
    text: string,
    isDone: boolean,
    createdAt: string
}

export type TodoList = {
    id: string,
    title: string,
    createdAt: string,
    items: TodoItem[]
}

export type RootStackParamList = {
    TodoLists: undefined;
    TodoItemsScreen: {
        listTitle: string,
        createdAt: string,
        listId: string,
        items: TodoItem[]
    };
};

export type RootRouteParamProps = RouteProp<RootStackParamList, 'TodoItemsScreen'>
export type RootNavigationParamProps = NativeStackNavigationProp<RootStackParamList, 'TodoItemsScreen'>

export type RootStackScreenProp<T extends keyof RootStackParamList> = {
    navigation: NativeStackNavigationProp<RootStackParamList, T>,
    route: RouteProp<RootStackParamList, T>

}



