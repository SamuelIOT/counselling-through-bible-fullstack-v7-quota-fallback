'use client'

import BackHome from '@/components/BackHome'
import { useI18n } from '@/lib/i18n'

export default function ContactClient() {
  const { locale } = useI18n()

  if (locale === 'ko') {
    return (
      <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
        <div className="mx-auto max-w-3xl space-y-6">
          <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />

          <h1 className="text-3xl font-bold">대면 상담 연락처</h1>

          <p className="text-lg leading-relaxed">
            성경 말씀으로 권면과 회복을 돕는 이 프로그램에 참여하도록 여러분을 초대합니다. 우리의 목표는 성경말씀, 기도, 
            실용적인 상담을 통해 그리스도 안에서 여러분을 격려하고 치유와 회복을 돕는 것입니다. 디지털 도구도 유용하고
            도움이 되지만, 실제 회복의 역사는 공동체에서 가장 잘 이루어지고 있습니다. 가능하다면, 인격적인 대면 상담을 
            생각해 보기길 권면합니다. 
          </p>

          <div className="rounded-2xl bg-blue-600 p-6 border border-blue-500">
            <p className="mb-4">
              유료 계획은 필요하지 않습니다. 성경적 상담, 성경적 치유 상담, 치유, 회복, 소망, 희망, 또는 성경적 상담 사역을 
              지원하고 싶다면 아래 연락처로 연락하세요.
            </p>

            <h2 className="text-xl font-semibold mb-3">연락처: 성경적 상담 사역</h2>
			<p className="mb-4">
				<strong>전자메일:</strong> 
				<a href="mailto:eunice8808242@gmail.com" className="underline ml-2">
					eunice8808242@gmail.com
				</a>
			</p>

			<p className="mb-4">
				<strong>전화나 문자: </strong>
				<a href="tel:01039597707">010-3959-7707</a>
			</p>


            <h3 className="text-lg font-semibold mb-2">
              대학 캠퍼스/커뮤니티 말씀 중심 상담 사역 (SNU, 서울) — 성경적 상담 사역:
            </h3>
            <p className="leading-relaxed">
              우리 커뮤니티는 국제 복음주의 교회(비교파)이며 그리스도와 그분의 나라에 
              헌신된 교회 네트워크입니다. 우리의 주요 초점은 성경을 공부하고, 
              우리 주님이자 구주 예수 그리스도의 은혜와 지식 안에서 성장하며, 
              그분의 가르침에 따라 살아가는 것입니다. 우리는 특히 대학생들에게 복음적인 인생관을 가지도록 섬기며 
              그들이 평생 건강한 하나님의 자녀로 성경의 가르침에 따라 살도록 기도합니다.
            </p>

		<p className="mt-3">
			<strong>웹사이트:</strong>{' '}
			
			<a
			href="http://www.snu5ubf.kr/xe/"
				className="underline"
				target="_blank"
				rel="noopener noreferrer"
			>
			SNU Chapter 5
			</a>
			</p>	

			
            <p className="mt-3">
              이웃의 지역에 성경을 믿는 교회에 연락하여 목사님, 성경선생, 또는 훈련받은 
              복음적인 상담사와 이야기하도록 요청할 수도 있습니다.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // English version
  return (
    <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />

        <h1 className="text-3xl font-bold">Contact</h1>

        <p className="text-lg leading-relaxed">
          We invite you to join this biblical counselling program. Our aim is to encourage 
          you in Christ through Scripture, prayer, and practical helps. Digital tools are 
          helpful, but spiritual care grows best in community. If you can, take a step 
          toward face-to-face support.
        </p>

        <div className="rounded-2xl bg-blue-600 p-6 border border-blue-500">
          <p className="mb-4">
            There is no paid plan required. If you would like to connect for biblical 
            counselling, hope, healing, discipleship, or to support the work, please 
            reach out using the contact below.
          </p>

          <h2 className="text-xl font-semibold mb-3">Contact</h2>
			<p className="mb-4">
				<strong>Email:</strong> 
				<a href="mailto:eunice8808242@gmail.com" className="underline ml-2">
					eunice8808242@gmail.com
				</a>
			</p>

          <h3 className="text-lg font-semibold mb-2">
            Campus / community counselors (SNU, Seoul) — biblical counselling & discipleship:
          </h3>
          <p className="leading-relaxed">
            Our community is an international evangelical church (non-denominational) and 
            network of local churches dedicated to Christ and his kingdom. Our main focus 
            is to study the Bible, grow in the grace and knowledge of our Lord and Savior 
            Jesus Christ, and live according to his teachings. We especially pray to reach 
            college students and help them grow as his lifelong healthy disciples.
          </p>
		<p className="mt-3">
			<strong>Website:</strong>{' '}
			
			<a
			href="http://www.snu5ubf.kr/xe/"
				className="underline"
				target="_blank"
				rel="noopener noreferrer"
			>
			SNU Chapter 5
			</a>
			</p>
          <p className="mt-3">
            You can also contact a local, Bible-believing church and ask to speak with 
            a pastor, elder, or trained biblical counselor.
          </p>
        </div>
      </div>
    </div>
  )
}
