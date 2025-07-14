import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useDispatch } from "react-redux";

import NewItemInput from "../../../../../src/features/todoList/components/NewItemInput";
import { addItem } from "../../../../../src/features/todoList/slices/todo";
import { ADD_TEXT, TEXT_INPUT_PLACEHOLDER_TEXT } from "../../../../../src/shared/types/consts";

const TEST_TEXT = 'testText';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}))

describe('NewItemInput tests', () => {
    beforeEach(() => {
        ((useDispatch as unknown) as jest.Mock).mockClear();
    });

    it('snapshot', () => {
        const snapshot = render(<NewItemInput />)

        expect(snapshot).toMatchSnapshot()
    })



    it('should renders with corrected placeholder', () => {
        const { getByPlaceholderText } = render(<NewItemInput />)

        expect(getByPlaceholderText(TEXT_INPUT_PLACEHOLDER_TEXT)).toBeTruthy()
    })

    it('should change text', () => {
        const { getByPlaceholderText } = render(<NewItemInput />);
        const inputText = getByPlaceholderText(TEXT_INPUT_PLACEHOLDER_TEXT);

        fireEvent.changeText(inputText, TEST_TEXT);

        expect(inputText.props.value).toBe(TEST_TEXT);
    })

    it('should not call dispatch after button click', () => {
        const dispatchMock = jest.fn();
        ((useDispatch as unknown) as jest.Mock).mockReturnValue(dispatchMock)

        const { getByText } = render(<NewItemInput />);

        const button = getByText(ADD_TEXT);
        fireEvent.press(button);

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    it.skip('should dispatch addItem after entering text and button click', async () => {
        const dispatchMock = jest.fn();
        ((useDispatch as unknown) as jest.Mock).mockReturnValue(dispatchMock);

        const { getByText, getByPlaceholderText } = render(<NewItemInput />)

        const inputText = getByPlaceholderText(TEXT_INPUT_PLACEHOLDER_TEXT);
        const button = getByText(ADD_TEXT);

        fireEvent.changeText(inputText, TEST_TEXT);

        await waitFor(() => {
            expect(inputText.props.value).toBe(TEST_TEXT);
        });

        fireEvent.press(button)

        expect(dispatchMock).toHaveBeenCalledWith(
            expect.objectContaining({
                type: addItem.type,
                payload: expect.objectContaining({
                    text: TEST_TEXT
                })
            })
        )
    })
})