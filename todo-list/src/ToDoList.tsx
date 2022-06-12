import { useForm } from "react-hook-form";

// function TodoList() {
//     const [todo, setTodo] = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//         setTodo(e.currentTarget.value);
//     }
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (todo.length < 10) {
//             return setToDoError("To do should be longer");
//         }
//         setToDoError("");
//         console.log("submit");
//     }

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value={todo} placeholder="write a to do.." />
//                 <button>Add</button>

//                 {toDoError !== "" ? toDoError : null}
//             </form>
//         </div>
//     );
// }

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    passwordCheck: string;
    extraError?: string;
}

function TodoList() {
    const { 
        register, 
        handleSubmit, 
        formState: {errors},
        setError,
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.passwordCheck) {
            setError(
                "passwordCheck", 
                { message: "password are not the same" },
                { shouldFocus: true }
            )
        }
        setError("extraError", {
            message: "server offline.."
        })
    }
    
    return (
        <div>
            <form 
                onSubmit={handleSubmit(onValid)}
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <input {...register("email", {
                    required: "email is required",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "only naver.com emails allowed"
                    },
                })} placeholder='email' />
                <span>{errors?.email?.message}</span>
                <input {...register("firstName", {
                    required: "write here",
                    validate: (value) => value.includes("nico") ? "no nicos allowd" : true
                })} placeholder='firstName' />
                <span>{errors?.firstName?.message}</span>
                <input {...register("lastName", {
                    required: "write here"
                })} placeholder='lastName' />
                <span>{errors?.lastName?.message}</span>
                <input {...register("username", {
                    required: "write here",
                    minLength: {
                        value: 10,
                        message: "your usernaem is too short."
                    }
                })} placeholder='username' />
                <span>{errors?.username?.message}</span>
                <input {...register("password", {
                    required: "write here", 
                    minLength: {
                        value: 5,
                        message: "your password is too short."
                    }
                })} placeholder='password' />
                <span>{errors?.password?.message}</span>
                <input {...register("passwordCheck", {
                    required: "password is required", 
                    minLength: {
                        value: 5,
                        message: "your password is too short."
                    }
                })} placeholder='passwordCheck' />
                <span>{errors?.passwordCheck?.message}</span>

                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}

export default TodoList;