import {describe, it, expect, vi, beforeEach} from 'vitest'
import {uniqueValidation} from './author'

describe('uniqueValidation', () => {
  let mockRule: any
  let mockClient: any
  let mockContext: any

  beforeEach(() => {
    mockClient = {
      fetch: vi.fn(),
    }

    mockContext = {
      getClient: vi.fn(() => mockClient),
      document: {
        _id: 'doc-1',
        _type: 'author',
      },
    }

    mockRule = {
      custom: vi.fn((fn) => ({custom: fn})),
    }
  })

  it('should return true when no existing author with that name', async () => {
    mockClient.fetch.mockResolvedValue([])
    uniqueValidation(mockRule)
    const customFn = mockRule.custom.mock.calls[0][0]

    const result = await customFn('New Author', mockContext)
    expect(result).toBe(true)
  })

  it('should return true when same document ID', async () => {
    mockClient.fetch.mockResolvedValue([{_id: 'doc-1'}])
    uniqueValidation(mockRule)
    const customFn = mockRule.custom.mock.calls[0][0]

    const result = await customFn('Existing Author', mockContext)
    expect(result).toBe(true)
  })

  it('should return error when author already exists', async () => {
    mockClient.fetch.mockResolvedValue([{_id: 'doc-2'}])
    uniqueValidation(mockRule)
    const customFn = mockRule.custom.mock.calls[0][0]

    const result = await customFn('Existing Author', mockContext)
    expect(result).toEqual({message: 'An author already exists with that name'})
  })

  it('should call client.fetch with correct parameters', async () => {
    mockClient.fetch.mockResolvedValue([])
    uniqueValidation(mockRule)
    const customFn = mockRule.custom.mock.calls[0][0]

    await customFn('Test Author', mockContext)
    expect(mockClient.fetch).toHaveBeenCalledWith(
      expect.any(String),
      {type: 'author', name: 'Test Author'},
      {perspective: 'published'},
    )
  })
})
