import { render, waitFor, fireEvent } from "@testing-library/react-native"
import TodoItem from "../../../../../src/features/todoList/components/TodoItem"
import { REMOVE_ITEM_TEXT } from "../../../../../src/shared/types/consts";

const TEST_PROPS = {
    id: 'testId',
    text: 'testText',
    createdAt: '20.10.1999',
    isDone: false,
    onDone: jest.fn(),
    onRemove: jest.fn()
}

describe('TodoItem component', () => {
    describe('snapshots', () => {
        it('snapshot test', () => {
            const snapshot = render(<TodoItem {...TEST_PROPS} />)
            expect(snapshot).toMatchSnapshot()
        })
    })

    describe('properties', () => {
        it('given props and mocked date should render mocked date', async () => {

            const { getByText } = render(<TodoItem {...TEST_PROPS} />)

            await waitFor(() => {
                expect(getByText(TEST_PROPS.createdAt)).toBeTruthy();
            })
        })

        it('given props should render text', async () => {
            const { getByText } = render(<TodoItem {...TEST_PROPS} />)

            await waitFor(() => {
                expect(getByText(TEST_PROPS.text)).toBeTruthy();
            })
        })

        it('given props should call onRemove after click', async () => {
            const { getByText } = render(<TodoItem {...TEST_PROPS} />)

            await waitFor(() => {
                const button = getByText(REMOVE_ITEM_TEXT);
                fireEvent.press(button);
            })

            expect(TEST_PROPS.onRemove).toHaveBeenCalled()
        })


    })
})