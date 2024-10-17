import { formatDate } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const Crossposts: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const crossposts = fileData.frontmatter["crossposts"]
  if (crossposts == null || crossposts.length == 0) {
    return <></>
  }
  crossposts.sort(function(a, b) {
    return b.time - a.time;
  })
  return (
    <details class={classNames(displayClass, "crossposts")} open="">
      <summary>
        <h3>Crossposts</h3>
      </summary>
      <ul>
        {crossposts.map((f) => {
          const host = new URL(f.url).host
          const time = new Date(f.time)!
          const timeElement = (
            <time datetime={f.time} title={f.time}>{formatDate(time, cfg.locale)}</time>
          )
          switch (host) {
            case "twitter.com":
            case "x.com":
              return (
                <li>
                  {timeElement}
                  <br/>
                  <i class="ri-twitter-fill"></i>&nbsp;
                  <a href={f.url} class="external">
                    Twitter
                  </a>
                </li>
              )

            default:
              return (
                <li>
                  {timeElement}
                  <br/>
                  <a href={f.url} class="external">
                    {host}
                  </a>
                </li>
              )
          }
        })}
      </ul>
    </details>
  )
}

Crossposts.css = style
export default (() => Crossposts) satisfies QuartzComponentConstructor
