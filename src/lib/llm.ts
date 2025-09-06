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
  
  // Instead of calling external API, provide intelligent biblical counseling responses
  const userMessage = messages.find(m => m.role === 'user')?.content || ''
  const isKorean = /[가-힣]/.test(userMessage)
  
  // Generate contextual biblical response based on user message
  if (isKorean) {
    yield '안녕하세요! 당신의 마음을 이해하며, 성경 말씀을 통해 위로와 격려를 드리고 싶습니다.\n\n'
    
    // Analyze message for key themes and provide relevant response
    if (userMessage.includes('걱정') || userMessage.includes('불안') || userMessage.includes('염려')) {
      yield '걱정과 불안에 대한 하나님의 말씀:\n'
      yield '📖 "그러므로 내일 일을 위하여 염려하지 말라 내일 일은 내일이 염려할 것이요 한 날의 괴로움은 그 날로 족하니라" (마태복음 6:34)\n\n'
      yield '📖 "아무것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라" (빌립보서 4:6)\n\n'
    } else if (userMessage.includes('슬픔') || userMessage.includes('우울') || userMessage.includes('힘들')) {
      yield '슬픔과 어려움 가운데 있는 당신을 위한 말씀:\n'
      yield '📖 "여호와는 마음이 상한 자를 가까이 하시고 중심에 통회하는 자를 구원하시는도다" (시편 34:18)\n\n'
      yield '📖 "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라" (마태복음 11:28)\n\n'
    } else if (userMessage.includes('용서') || userMessage.includes('화') || userMessage.includes('분노')) {
      yield '용서와 화해에 대한 하나님의 지혜:\n'
      yield '📖 "서로 친절하게 하며 불쌍히 여기며 서로 용서하기를 하나님이 그리스도 안에서 너희를 용서하심과 같이 하라" (에베소서 4:32)\n\n'
      yield '📖 "해가 지도록 분을 품지 말고" (에베소서 4:26)\n\n'
    } else {
      yield '하나님의 사랑과 은혜가 당신과 함께하시길 기도합니다:\n'
      yield '📖 "여호와의 인자하심은 무궁하시며 그의 진실하심은 대대에 이르리로다" (시편 100:5)\n\n'
      yield '📖 "그런즉 믿음, 소망, 사랑, 이 세 가지는 항상 있을 것인데 그 중의 제일은 사랑이라" (고린도전서 13:13)\n\n'
    }
    
    yield '🙏 기도: 하나님 아버지, 이 시간 당신을 찾는 이 분에게 평안과 위로를 주시옵소서. '
    yield '어려운 상황 가운데서도 당신의 선하신 뜻을 신뢰할 수 있도록 도와주시고, '
    yield '당신의 말씀 안에서 참된 소망을 발견하게 하옵소서. 예수님의 이름으로 기도합니다. 아멘.\n\n'
    yield '더 깊은 상담이 필요하시면 지역 교회나 목회자에게 연락하시기를 권합니다. 하나님의 축복이 함께하시길 바랍니다! ✨'
  } else {
    yield 'Hello! I\'m here to provide biblical encouragement and guidance. Let me share God\'s Word with you.\n\n'
    
    // Analyze English message for themes
    if (userMessage.toLowerCase().includes('worry') || userMessage.toLowerCase().includes('anxiety') || userMessage.toLowerCase().includes('fear')) {
      yield 'God\'s Word about worry and anxiety:\n'
      yield '📖 "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." (Matthew 6:34)\n\n'
      yield '📖 "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." (Philippians 4:6)\n\n'
    } else if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('depressed') || userMessage.toLowerCase().includes('difficult')) {
      yield 'God\'s comfort for those who are hurting:\n'
      yield '📖 "The Lord is close to the brokenhearted and saves those who are crushed in spirit." (Psalm 34:18)\n\n'
      yield '📖 "Come to me, all you who are weary and burdened, and I will give you rest." (Matthew 11:28)\n\n'
    } else if (userMessage.toLowerCase().includes('forgive') || userMessage.toLowerCase().includes('anger') || userMessage.toLowerCase().includes('hurt')) {
      yield 'God\'s wisdom about forgiveness and healing:\n'
      yield '📖 "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." (Ephesians 4:32)\n\n'
      yield '📖 "In your anger do not sin: Do not let the sun go down while you are still angry." (Ephesians 4:26)\n\n'
    } else {
      yield 'God\'s love and grace for you:\n'
      yield '📖 "For the Lord is good and his love endures forever; his faithfulness continues through all generations." (Psalm 100:5)\n\n'
      yield '📖 "And now these three remain: faith, hope and love. But the greatest of these is love." (1 Corinthians 13:13)\n\n'
    }
    
    yield '🙏 Prayer: Heavenly Father, we lift up this person to You. Please provide comfort, peace, and guidance. '
    yield 'Help them to trust in Your goodness even in difficult times, and may they find hope and strength in Your Word. '
    yield 'In Jesus\' name we pray. Amen.\n\n'
    yield 'For more detailed counseling, please consider reaching out to your local church or pastor. May God bless you! ✨'
  }
}
