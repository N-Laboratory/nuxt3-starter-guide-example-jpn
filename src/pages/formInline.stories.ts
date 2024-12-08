import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from '@storybook/test'
import FormInline from './formInline.vue'

type Story = StoryObj<typeof FormInline>

const meta: Meta<typeof FormInline> = {
  title: 'FormInline',
}
export default meta

export const Default: Story = {
  render: () => ({
    components: { FormInline },
    template: '<FormInline />',
  }),
}

export const EmptyForm: Story = {
  render: () => ({
    components: { FormInline },
    template: '<FormInline />',
  }),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.type(canvas.getByPlaceholderText('email'), '{tab}')
    await userEvent.type(canvas.getByPlaceholderText('password'), '{tab}')

    // Assert
    expect(await canvas.findByText('emailは必須項目です')).toBeInTheDocument()
    expect(await canvas.findByText('passwordは必須項目です')).toBeInTheDocument()
    const isDisabled = (await canvas.findByRole('button') as HTMLButtonElement).disabled
    expect(isDisabled).toBe(true)
  },
}

export const InvalidEmailForm: Story = {
  render: () => ({
    components: { FormInline },
    template: '<FormInline />',
  }),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.type(canvas.getByPlaceholderText('email'), 'test{tab}')

    // Assert
    expect(await canvas.findByText('emailは有効なメールアドレスではありません')).toBeInTheDocument()
    const isDisabled = (await canvas.findByRole('button') as HTMLButtonElement).disabled
    expect(isDisabled).toBe(true)
  },
}

export const FullForm: Story = {
  render: () => ({
    components: { FormInline },
    template: '<FormInline />',
  }),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.type(canvas.getByPlaceholderText('email'), 'test@test.com')
    await userEvent.type(canvas.getByPlaceholderText('password'), 'test')

    // Assert
    const isDisabled = (await canvas.findByRole('button') as HTMLButtonElement).disabled
    expect(isDisabled).toBe(false)
  },
}
