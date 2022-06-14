import styled from "styled-components";
import { useSetRecoilState } from 'recoil';
import { categoryState, userCategoriesState } from "../atoms";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, .4);
`;
const Header = styled.h2`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    margin-bottom: 15px;
`;
const ModalForm = styled.div`
    position: absolute;
    top: 1vh;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 300px;
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 5px;
    color: #333;
    padding: 10px;

    input {
        border: 2px solid #333;
    }
`;
const ErrorText = styled.p`
    color: red;
`

interface ICategoryForm {
    category: string;
}

function ModalCreateCategory({ onClose }: any) {
    const setCategory = useSetRecoilState(categoryState);
    const setCategories = useSetRecoilState(userCategoriesState);
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<ICategoryForm>();

    const handleValid = ({category}: ICategoryForm) => {
        setValue("category", "")
        setCategories(categories => categories.concat(category))
        setCategory(category);
        onClose();
    }

    return (
        <Container>
            <ModalForm>
                <Header>
                    <span>add new category</span>
                    <button onClick={onClose}>&times;</button>
                </Header>
                <form
                    onSubmit={handleSubmit(handleValid)}
                >
                    <div>
                        <input
                            {...register("category", {
                                required: "please write a category",
                            })}
                            placeholder='write a new category'
                        />
                        
                        <button>Add</button>
                    </div>
                    <ErrorText>{errors.category?.message}</ErrorText>
                </form>
            </ModalForm>
        </Container>
    )
}

export default ModalCreateCategory;