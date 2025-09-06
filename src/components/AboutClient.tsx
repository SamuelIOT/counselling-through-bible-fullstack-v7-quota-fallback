'use client'

import BackHome from '@/components/BackHome'
import { useI18n } from '@/lib/i18n'

// Reusable section panel
function Panel({
  id,
  children,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`rounded-2xl bg-white/5 p-5 border border-white/20 leading-relaxed ${className}`}
    >
      {children}
    </section>
  )
}

export default function AboutClient() {
  const { locale } = useI18n()

  if (locale === 'ko') {
    return (
      <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
        <div className="mx-auto max-w-3xl space-y-6">
          <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />

          <h1 className="text-3xl font-bold">성경 말씀 중심 상담 소개</h1>

          <Panel>
            <p>
              이 사이트는 일반적인 삶의 어려움과 고민에 대한 성경을 중심으로 바라보고 위로와 새 힘과 격려와 소망과 기도를 제공합니다. 
              성경 구절을 탐구하고, 실용적인 지침과 인도함을 묵상하며, 기도로 응답할 수 있도록 도와줍니다.
            </p>
            <p className="mt-3">
              <span className="font-semibold">이 프로그램이 추구 히는것:</span> 예수님, 그분의 말씀, 뵥음에서 보는 인생 문제, 
              지혜로운 다음 단계를 가리키도록 설계된 성경 중심 상담, 치유, 회복, 소망과 기도 안내입니다.
            </p>
            <p className="mt-2">
              <span className="font-semibold">이 프로그램은 다음을 수행하지 않습니다.</span> 전문 상담, 의료 치료, 
              법적 조언 또는 응급 서비스를 대체하는 것이 아닙니다.
            </p>
          </Panel>

          <Panel>
            <h2 className="text-xl font-semibold">사용 방법</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <span className="font-semibold">상담 주제:</span> 상담 주제, 합당한 성경 구절, 짧은 묵상, 
                간단한 기도가 포함된 선별된 카드를 둘러보세요.
              </li>
              <li>
                <span className="font-semibold">AI 도우미:</span> 질문하고 성경과 선택한 주제를 
                참조하는 AI의 도움을 받으세요. AI는 도구일 뿐 교사가 아닙니다 — 항상 성경으로 돌아가  
                성령의 움성과 조언을 들으세요 (사도행전 17:11).
              </li>
              <li>
                <span className="font-semibold">연락처:</span> 성경에 기초한 상담, 회복, 치유, 희망, 사랑, 믿음과 기도의 도움이 필요하시면 
                또는 사역을 지원하고 싶다면 연락하세요.
              </li>
            </ul>
          </Panel>

          <Panel>
            <h2 className="text-xl font-semibold">응급 서비스나 도움을구하기</h2>
            <p className="mt-2">
              위험에 처해 있거나 자해를 고려하고 있다면, 즉시 지역 응급 서비스나 
              위기 상담 전화에 연락하세요. 지속적인 어려움의 경우, 목사님, 성숙한 
              기독교 친구, 또는 면허가 있는 전문 상담사로부터 도움을 구하세요. 
              하나님은 종종 그분의 백성을 통해 우리를 돌보십니다.
            </p>
          </Panel>

          <Panel>
            <h2 className="text-xl font-semibold">우리의 목표</h2>
            <p className="mt-2">
              우리는 성경이 하나님의 감동으로 기록되어서 진리를 가르치고 잘못을 책망하여 바로 잡게 하고 의로 훈련시키기에 유익한 말씀임을 믿습니다 
              (디모데후서 3:16-17). 우리의 목표는 하나님의 말씀을 듣고, 응답하며, 기도와 교회의 지원으로 실제 삶에서 순종하여 인생의 풍성한 열매를 맺도록 돕는 것입니다.
            </p>
          </Panel>

          <Panel id="in-person">
            <h2 className="text-xl font-semibold">대면 성경 상담</h2>
            <p className="mt-2">
              디지털 도구는 도움이 되지만, 실제 회복의 역사는 공동체에서 가장 잘 이루어지고 있습니다. 가능하다면, 인격적인 대면 상담을 
            생각해 보기길 권면합니다. 
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <span className="font-semibold">근처의 복음적인 교회에 연락하세요.</span> 
                목사님, 장로님, 또는 훈련받은 말씀 중심 사역자나 상담사와 이야기하도록 요청하세요. 
                많은 교회들이 성경과 기도에 뿌리를 둔 사생활 기밀 유지, 무료 돌봄을 제공합니다.
              </li>
              <li>
                <span className="font-semibold">캠퍼스/커뮤니티 상담사역 (SNU, 서울)</span>{' '}

                — 성경 중심으로 상담 및 학생 전도사역. 우리 커뮤니티는 국제 복음주의 교회(비교파)이며 
                그리스도와 그분의 나라에 헌신된 교회 네트워크입니다. 우리의 주요 
                초점은 성경을 공부하고, 우리 주님이자 구주 예수 그리스도의 은혜와 
                지식 안에서 성장하며, 그분의 가르침에 따라 살아가는 것입니다. 
                우리는 특히 대학생들이 성경에 기초한 인생관을 가르치고 그들이 평생 건강한 예수님의 제자로 
                성장하도록 돕기 위해 기도합니다.
              </li>
              <li>
                <span className="font-semibold">성숙한 신자와 함께 걷기.</span> 신뢰할 수 있는 
                형제나 자매를 초대하여 성경을 읽고, 기도하며, 함께 여정을 걷도록 하세요 
                (갈라디아서 6:2; 디도서 2).
              </li>
              <li>
                <span className="font-semibold">위기 상황에서는,</span> 먼저 응급 서비스에 
                연락하여 안전을 확보한 후, 목회적이고 전문적인 돌봄을 따르세요.
              </li>
            </ul>
            <p className="mt-3">
              주님께서 다음 단계를 내딛을 때 지혜로운 조언, 건강한 친교, 
              성령의 위로로 여러분과 함께 하시기를 바랍니다 (요한복음 14:26).
            </p>
          </Panel>
        </div>
      </div>
    )
  }

  // English version
  return (
    <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />

        <h1 className="text-3xl font-bold">About Biblical Counselling</h1>

        <Panel>
          <p>
            This site provides Scripture-anchored encouragement for common life struggles. It
            helps you explore Bible passages, reflect on practical guidance, and pray in response.
          </p>
          <p className="mt-3">
            <span className="font-semibold">What it is:</span> Bible-first counsel and prayer
            prompts designed to point you to Jesus, His Word, and wise next steps.
          </p>
          <p className="mt-2">
            <span className="font-semibold">What it is not:</span> a substitute for professional
            counseling, medical treatment, legal advice, or emergency services.
          </p>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold">How it works</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-semibold">Topics:</span> Browse curated cards with Bible
              verses, a short reflection, and a simple prayer.
            </li>
            <li>
              <span className="font-semibold">AI Assistant:</span> Ask questions and receive
              responses that reference Scripture and your selected topics. AI is a tool, not a
              teacher—always test counsel by the Bible (Acts 17:11).
            </li>
            <li>
              <span className="font-semibold">Contact:</span> Reach out if you would like
              biblical counselling, prayer, or to support the work.
            </li>
          </ul>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold">Safety &amp; Care</h2>
          <p className="mt-2">
            If you are in danger or considering self-harm, call local emergency services or a
            crisis hotline immediately. For ongoing struggles, seek care from your pastor, a
            mature Christian friend, or a licensed professional counselor. God often cares for us
            through His people.
          </p>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold">Our Aim</h2>
          <p className="mt-2">
            We believe Scripture is inspired and sufficient to equip believers for godly living
            (2 Tim 3:16–17). Our aim is to help you hear God's Word, respond in prayer, and walk
            in practical obedience with the support of the church.
          </p>
        </Panel>

        <Panel id="in-person">
          <h2 className="text-xl font-semibold">In-Person Biblical Counselling</h2>
          <p className="mt-2">
            Digital tools are helpful, but spiritual care grows best in community. If you can,
            take a step toward face-to-face support:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-semibold">Contact a local, Bible-believing church.</span> Ask
              to speak with a pastor, elder, or trained biblical counselor. Many churches offer
              confidential, no-cost care rooted in Scripture and prayer.
            </li>
            <li>
              <span className="font-semibold">Campus / community counselors (SNU, Seoul):</span>{' '}
              <a href="mailto:eunice8808242@gmail" className="underline">
                eunice8808242@gmail.com
              </a>{' '}
              — biblical counselling &amp; discipleship. Our community is an international evangelical church (non-denominational) and network of local churches dedicated to Christ and his kingdom. Our main focus is to study the Bible, grow in the grace and knowledge of our Lord and Savior Jesus Christ, and live according to his teachings. We especially pray to reach college students and help them grow as his lifelong healthy disciples.
            </li>
            <li>
              <span className="font-semibold">Walk together with a mature believer.</span> Invite a
              trusted brother or sister to read Scripture, pray, and journey with you (Gal 6:2;
              Titus 2).
            </li>
            <li>
              <span className="font-semibold">In a crisis,</span> contact emergency services first
              to secure safety, then follow up with pastoral and professional care.
            </li>
          </ul>
          <p className="mt-3">
            May the Lord surround you with wise counsel, steady friendship, and the comfort of the
            Holy Spirit as you take your next step (John 14:26).
          </p>
        </Panel>
      </div>
    </div>
  )
}
