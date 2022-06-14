import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import ModalCreateCategory from "./ModalCreateCategory";
import { useState } from "react";
import { userCategoriesState } from './../atoms/index';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 1vh auto;
    padding: 15px;
    border: 1px solid #fff;
    border-radius: 10px;
`;
const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    select, input, button {
        height: 30px;
    }
`;
const ToDoContainer = styled.ul`
    li {
        display: flex;
        justify-content: space-between;
        border: 1px solid #333;
        background-color: #eee;
        color: #333;
        padding: 5px;
        font-weight: 600;
        margin-bottom: 5px;

        &:last-child {
            margin: 0;
        }
    }
`;

function TodoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useRecoilState(categoryState);
    const userCategories = useRecoilValue(userCategoriesState);
    const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    }

    return (
        <Container>
            <Title>To Dos</Title>
            <hr />
            <Header>
                <button onClick={() => setShowModal(true)}>+</button>
                <select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>To Do</option>
                    <option value={Categories.DOING}>Doing</option>
                    <option value={Categories.DONE}>Done</option>
                    {userCategories.map((item, i) => <option key={i} value={item}>{item}</option>)}
                </select>
                <CreateToDo />
            </Header>

            <ToDoContainer>
                {toDos?.map(item => <ToDo key={item.id} {...item} />)}
            </ToDoContainer>

            {showModal && <ModalCreateCategory onClose={() => setShowModal(false)}/>}
        </Container>
    );
}

export default TodoList;