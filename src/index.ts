import axios from "axios";
import {GetLiveStreamingDetailsResult} from "../types";
import {Moment} from "moment";
import moment = require("moment")

(async () => {
  await register()

  const observer = new MutationObserver((_, __) => {
    register()
  })

  let timer: NodeJS.Timer

  timer = setInterval(() => {
    const player = document.querySelector(".video-stream.html5-main-video");
    if (player) {
      observer.observe(player!, {
        attributes: true,
        attributeFilter: ["src"]
      })
      clearTimeout(timer)
    }
  }, 500)
})()

let seekbarObserver: MutationObserver | undefined

async function register() {
  seekbarObserver?.disconnect()

  const search = new URLSearchParams(location.search)
  if (search.has("v")) {
    try {
      const result = await axios.get<GetLiveStreamingDetailsResult>(`http://localhost:5001/yt-live-sync/asia-northeast1/getLiveStreamDetails?v=${search.get("v")}`)

      if (result.data.exists && result.data.liveStreamingDetails.actualStartTime) {
        const startTime = result.data.liveStreamingDetails.actualStartTime

        const player = document.getElementsByClassName("video-stream html5-main-video")[0] as HTMLVideoElement

        player.ontimeupdate = () => {
          const actualDate = moment(startTime)
          actualDate.add(player.currentTime, "seconds")
          updateDisplay(actualDate)
        }

        const sliderTooltipElement = document.getElementsByClassName("ytp-tooltip-text")[0];
        seekbarObserver = new MutationObserver((mutations, _) => {
          const elements = sliderTooltipElement!.textContent!.split(":");
          if (elements.length >= 2 && !sliderTooltipElement!.textContent!.includes("(")) {
            let colonTime = sliderTooltipElement!.textContent!.split(" ")[0];
            const actualDate = colonTime.startsWith("-") ? moment() : moment(startTime)
            let timeParts = colonTime.replace("-", "").split(":")
            if (timeParts.length === 2) {
              timeParts = ["0", ...timeParts]
            }
            actualDate.add((colonTime.startsWith("-") ? "-" : "") + timeParts.join(":"))
            sliderTooltipElement.textContent = `${elements.join(":")} (${actualDate.format("M/D H:mm:ss")})`
          }
        })
        seekbarObserver.observe(sliderTooltipElement, {
          characterData: true,
          childList: true,
          subtree: true
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
}

function updateDisplay(actualDate: Moment) {
  let span = document.querySelector(".yt-live-sync-actual-time") as HTMLSpanElement | null
  if (!span) {
    const display = document.querySelector(".ytp-time-display")
    span = document.createElement("span")
    span.className = "yt-live-sync-actual-time"
    display?.appendChild(span)
  }
  span.style.marginLeft = "8px"
  span.style.opacity = "0.8"
  span.textContent = `(${actualDate.format("M/D H:mm:ss")})`
  span.title = actualDate.format("M/D H:mm:ss")

  span.oncontextmenu = (ev) => {

  }
}
