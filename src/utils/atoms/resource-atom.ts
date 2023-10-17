import { atom } from 'recoil';
import {getRandomId} from "../random";

export const RESOURCE_ARRAY_STORAGE_KEY = 'resourceArray';
export const SELECTED_RESOURCE_STORAGE_KEY = 'selectedResource';

export type Resource = {
    src: string | null;
    key: string;
}

export const resourceArrayState = atom<Resource[]>({
    key: 'resourceArrayState',
    default: localStorage.getItem(RESOURCE_ARRAY_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(RESOURCE_ARRAY_STORAGE_KEY) as string)
        : [
            {
                src: 'https://www.robinwieruch.de/react-libraries/',
                key: getRandomId()
            },
            {
                src:'https://typed.do/blog-kr/how-to-make-good-usability-product/',
                key: getRandomId()
            },
        ],
    effects_UNSTABLE: [({ onSet }) => {
        onSet((newResourceArray) => {
            localStorage.setItem(RESOURCE_ARRAY_STORAGE_KEY, JSON.stringify(newResourceArray));
        });
    }],
});

export const selectedResourceState = atom<Resource | null>({
    key: 'selectedResourceState',
    default: null
});

type UpdateFunction<T> = (oldState: T) => T;

export const addResource = (newResource: string | null): UpdateFunction<Resource[]> => {
    return (oldState) => [{key: getRandomId(), src: newResource}, ...oldState];
};

export const updateResource = (index: number, updatedResource: string): UpdateFunction<Resource[]> => {
    return (oldState) => {
        const newState = [...oldState];
        newState[index] = {key: newState[index].key, src: updatedResource};
        return newState;
    };
};

export const deleteResource = (index: number): UpdateFunction<Resource[]> => {
    return (oldState) => {
        const newState = [...oldState];
        newState.splice(index, 1);
        return newState;
    };
};

export const selectResource = (selected: Resource | null): UpdateFunction<Resource | null> => {
    return () => selected;
};
