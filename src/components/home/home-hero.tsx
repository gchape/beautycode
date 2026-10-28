import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button.tsx";

export function HomeHero() {
	return (
		<section className="grid min-h-[555px] grid-cols-2 overflow-hidden rounded-xl bg-rose-surface max-[800px]:min-h-[470px] max-[560px]:flex max-[560px]:flex-col mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)]">
			<div className="relative z-1 pt-[66px] pb-[55px] pl-[60px] max-[1100px]:pl-[38px] max-[800px]:pt-[45px] max-[800px]:pb-[35px] max-[800px]:pl-7 max-[560px]:px-[25px] max-[560px]:pt-[35px] max-[560px]:pb-0">
				<span className="flex items-center gap-3 text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
					<span className="h-px w-[26px] bg-[#985f70]" /> შენი ყოველდღიური
					რიტუალი
				</span>
				<h1 className="mt-[30px] mb-[22px] text-[clamp(36px,4vw,57px)] leading-normal tracking-[-0.04em] max-[1100px]:text-[2.75rem] max-[800px]:text-4xl max-[560px]:mt-[23px] max-[560px]:mb-[18px] max-[560px]:text-[2.625rem]">
					სილამაზე იწყება
					<br />
					<em className="text-[#9e627b] not-italic">შენით.</em>
				</h1>
				<p className="mb-[29px] text-base leading-[2.1] text-[#795d66] max-[560px]:text-[0.9375rem]">
					აღმოაჩინე მოვლა, რომელიც შენ გიხდება.
					<br />
					პატარა დეტალები, დიდი თავდაჯერებულობა.
				</p>
				<Button asChild>
					<Link to="/products" search={{}}>
						აღმოაჩინე კოლექცია <ArrowUpRight size={19} />
					</Link>
				</Button>
				<span className="mt-6 block text-xs text-[#80676e] max-[560px]:mt-[18px] max-[560px]:text-[0.6875rem]">
					შერჩეული შენთვის · ზრუნვით გამოგზავნილი
				</span>
			</div>
			<div className="relative isolate min-h-[555px] bg-[radial-gradient(ellipse_at_60%_45%,#fff9f7_0%,transparent_65%)] max-[800px]:min-h-[470px] max-[600px]:min-h-[360px]">
				<span
					className="absolute top-[45px] right-[35px] bottom-[65px] left-[35px] -rotate-20 rounded-full border border-[#d8b8c6]"
					aria-hidden="true"
				/>
				<img
					className="absolute bottom-10 left-[12%] h-[44%] w-[76%] object-contain drop-shadow-[0_18px_16px_#643d4b20]"
					src="/images/ipl-kit-cutout.png"
					alt="IPL ეპილაციის ნაკრები დამცავი სათვალით და ორი თავაკით"
					width="1536"
					height="1024"
				/>
				<img
					className="absolute top-5 right-[3%] h-[53%] w-[48%] object-contain drop-shadow-[0_18px_16px_#643d4b20] max-[600px]:right-0"
					src="/images/scalp-massager-cutout.png"
					alt="წითელი სკალპის მასაჟორ-სავარცხელი"
					width="1254"
					height="1254"
					fetchPriority="high"
				/>
				<img
					className="absolute top-[35px] left-[3%] h-[48%] w-[46%] object-contain drop-shadow-[0_18px_16px_#643d4b20] max-[600px]:left-3"
					src="/images/ipl-colors-cutout.png"
					alt="ეპილაციის აპარატები სამ ფერში"
					width="1312"
					height="1199"
				/>
				<span className="absolute right-[30px] bottom-[35px] text-xs text-[#795d66] max-[600px]:right-5 max-[600px]:bottom-[18px]">
					მოვლა, შენს სივრცეში.
				</span>
			</div>
		</section>
	);
}
