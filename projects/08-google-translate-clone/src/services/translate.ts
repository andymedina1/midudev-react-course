// import { Configuration, OpenAIApi } from 'openai'
import { SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types.d'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const configuration = console.log('configuation')
const openai = console.log('openai')

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const messages = [
    {
      role: 'ChatCompletionRequestMessageRoleEnum.System',
      content: 'instructions',
    },
    {
      role: 'ChatCompletionRequestMessageRoleEnum.User',
      content: 'use examples',
    },
    {
      role: 'ChatCompletionRequestMessageRoleEnum.Assistant',
      content: 'asnwer examples',
    },
  ]

  const fromCode =
    fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]

  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = 'await openai.createChatCompletion({Object})'

  // return completion.data.choices[0]?.message?.content
  return 'Insert your OpenAI API Key'
}
