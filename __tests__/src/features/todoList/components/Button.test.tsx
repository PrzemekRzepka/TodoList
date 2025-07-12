import { fireEvent, render } from "@testing-library/react-native"

import Button from "../../../../../src/features/todoList/components/Button"

const TEST_PRESS_FUNCTION = jest.fn();

const BUTTON_TEST_PROPS = {
    title: 'testTitle',
    onPress: TEST_PRESS_FUNCTION
}

describe('Button tests', () => {
    it('snapshot', () => {
        const button = render(<Button {...BUTTON_TEST_PROPS} />)

        expect(button).toMatchSnapshot
    })

    it('should call function fter press', () => {
        const { getByText } = render(<Button {...BUTTON_TEST_PROPS} />);

        const button = getByText(BUTTON_TEST_PROPS.title);

        fireEvent.press(button);

        expect(TEST_PRESS_FUNCTION).toHaveBeenCalled()
    })
})