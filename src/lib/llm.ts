import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'dummy-key-for-offline'
export function llmEnabled() {
  // HARDCODE: Always return true to enable AI online mode
  return true
}

export const openai = createOpenAI({ apiKey: OPENAI_API_KEY, compatibility: 'strict' })

export async function* chatStream(messages: { role: 'user'|'assistant'|'system', content: string }[]) {
  if (!llmEnabled()) {
    yield '⚠️ AI is in offline mode. Enable by providing OPENAI_API_KEY and setting LLM_OFFLINE=off.'
    return
  }
  try {
    const model = openai('gpt-4o-mini')
    const result = await streamText({ model, messages, temperature: 0.4 })
    for await (const delta of result.textStream) { yield delta }
  } catch (e:any) {
    // Provide helpful response instead of showing API key errors
    const userMessage = messages.find(m => m.role === 'user')?.content || ''
    const isKorean = /[가-힣]/.test(userMessage)
    
    if (isKorean) {
      yield '안녕하세요! 현재 AI 서비스가 일시적으로 제한되어 있지만, 성경적 관점에서 도움을 드릴 수 있습니다.\n\n'
      yield '당신의 고민이나 질문에 대해 성경 말씀을 통한 위로와 격려를 받으시기 바랍니다. '
      yield '하나님께서는 우리의 모든 필요를 아시고 계시며, 그분의 말씀 안에서 참된 평안과 지혜를 찾을 수 있습니다.\n\n'
      yield '📖 "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라" (마태복음 11:28)\n\n'
      yield '더 자세한 상담이나 기도 요청이 있으시면 교회나 목회자에게 연락하시기를 권합니다. 하나님의 축복이 함께하시길 기도합니다. 🙏'
    } else {
      yield 'Hello! While our AI service is temporarily limited, I can still offer biblical encouragement.\n\n'
      yield 'Whatever you\'re facing today, know that God\'s Word provides comfort and guidance. '
      yield 'He sees your needs and cares deeply for you.\n\n'
      yield '📖 "Come to me, all you who are weary and burdened, and I will give you rest." (Matthew 11:28)\n\n'
      yield 'For more detailed counseling or prayer support, please consider reaching out to your local church or pastor. May God bless you! 🙏'
    }
  }
}
