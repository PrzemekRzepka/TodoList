import { render, waitFor, fireEvent } from "@testing-library/react-native"
import TodoItem from "../../../../../src/features/todoList/components/TodoItem"
import { REMOVE_ITEM_TEXT } from "../../../../../src/shared/types/consts";


const FIXED_TIMESTAMP = 1234567890000;
const FIXED_DATE_STRING = new Date(FIXED_TIMESTAMP).toString();

const TEST_PROPS = {
    id: 'testId',
    text: 'testText',
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
            jest.spyOn(Date, 'now').mockImplementation(() => FIXED_TIMESTAMP)
            const { getByText } = render(<TodoItem {...TEST_PROPS} />)

            await waitFor(() => {
                expect(getByText(`${FIXED_DATE_STRING} :`)).toBeTruthy();
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