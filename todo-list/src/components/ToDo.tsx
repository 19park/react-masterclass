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
            const newTodo = { ...oldToDo, category: name as any };
            return [
                ...oldToDos.slice(0, targetIdx),
                newTodo,
                ...oldToDos.slice(targetIdx + 1)
            ];
        })
    }
    const deleteToDo = (e: React.MouseEvent) => {
        setToDos((oldToDos) => oldToDos.filter(item => item.id !== id));
    };

    return (
        <li>
            <span>{text}</span>
            <div>
                {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>🔄</button>}
                {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>✍️</button>}
                {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>✅</button>}

                <button onClick={deleteToDo}>❌</button>
            </div>
        </li>
    );
}

export default ToDo;