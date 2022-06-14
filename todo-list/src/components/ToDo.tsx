import { Categories, IToDo, toDoState } from './../atoms/index';
import { useSetRecoilState } from 'recoil';

function ToDo({ id, text, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name }
        } = event;
        setToDos((oldToDos: IToDo[]) => {
            const targetIdx = oldToDos.findIndex(todo => todo.id === id);
            const oldToDo = oldToDos[targetIdx];
            const newTodo = {...oldToDo, category: name as any};
            return [
                ...oldToDos.slice(0, targetIdx),
                newTodo,
                ...oldToDos.slice(targetIdx+1)                
            ];
        })
    }

    return (
        <li>
            {text}
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
        </li>
    );
}

export default ToDo;