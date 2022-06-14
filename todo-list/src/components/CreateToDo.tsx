import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';
import { useRecoilValue } from 'recoil';

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { 
        register, 
        handleSubmit, 
        setValue,
    } = useForm<IForm>();

    const handleValid = ({toDo}: IForm) => {
        setValue("toDo", "")
        setToDos(oldToDos => [{
            id: Date.now(),
            text: toDo,
            category
        }, ...oldToDos])
    }

    return (
        <form 
            onSubmit={handleSubmit(handleValid)}>
            <input 
                {...register("toDo", {
                    required: "please write a to do",
                })} 
                placeholder='write a to do' 
            />
            
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;