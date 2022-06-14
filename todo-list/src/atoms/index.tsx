import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: localStorage,
});

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}
export type UserCategories = Categories | string;

export interface IToDo {
    id: number;
    text: string;
    category: UserCategories;
}

export const categoryState = atom<UserCategories>({
    key: "category",
    default: Categories.TO_DO,
})

export const userCategoriesState = atom<string[]>({
    key: "userCategories",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        return toDos.filter(toDo => toDo.category === category);
    }
})