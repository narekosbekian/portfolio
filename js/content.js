/* ==========================================================================
   CONTENT — the single source of truth for the whole site.
   Everything you see on the page comes from this file. Nothing else needs
   editing to change copy, swap an image, add a project or add a testimonial.

   IMAGES
   ------
   Every `image` field is a path relative to the project root, e.g.
       "assets/images/work/research-system-cover.jpg"
   Drop the real file at that path and it appears. Until then the site renders
   a labelled placeholder box in its place, so nothing breaks and you can see
   exactly which file is still missing. Recommended sizes are noted inline and
   listed in assets/images/README.md.

   ADDING A CASE STUDY
   -------------------
   Add one object to work.projects below. Its `slug` becomes the URL:
       case-study.html?id=<slug>
   Its `caseStudy.blocks` array is the body of that page. Two block types:
       { type: "text",  heading: "...", body: ["para 1", "para 2"] }
       { type: "image", image: "assets/images/work/...", alt: "...",
         caption: "optional line under the image" }
   Add, remove and reorder blocks freely — the page renders them in order.
   ========================================================================== */

window.CONTENT = {

  /* ---- Global -------------------------------------------------------- */
  site: {
    name: "Nare Kosbekian",
    title: "Nare Kosbekian — Product Designer",
    description: "Product designer with eight years in product and design, most recently leading design for a matchmaking platform used by 8M+ users across ten countries.",
    logoMark: "assets/brand/logo-mark.png",
    email: "nare.kosbekian@gmail.com",
    location: "Vancouver, BC",
    linkedinUrl: "https://www.linkedin.com/in/nare-kosbekian/",
    resumeUrl: "assets/resume.pdf",
    copyright: "© 2026 Nare Kosbekian. All rights reserved."
  },

  /* Header nav. `href` starting with "#" scrolls on the landing page and
     jumps back to it from a case-study page. */
  nav: {
    links: [
      { label: "About",      href: "#about"   },
      { label: "Work",       href: "#work"    },
      { label: "Let's Talk", href: "#connect" }
    ],
    cta: { label: "Résumé", href: "assets/resume.pdf", newTab: true }
  },

  /* ---- Hero ---------------------------------------------------------- */
  hero: {
    titleLead: "A ",
    titleHighlight: "designer",
    titleTrail: " translating user research into product strategy.",
    body: [
      "I’ve scaled rigorous research across continents and designed products that move metrics. Looking for teams where research informs strategy and design delivers results."
    ],
    // ~900 x 940px, transparent PNG or a cut-out portrait works best
    portrait: { image: "assets/images/hero-portrait.webp", alt: "Nare Kosbekian holding a laptop" },
    actions: [
      { label: "View Selected Works", href: "#work",                       style: "cta" },
      { label: "e-mail",              href: "mailto:nare.kosbekian@gmail.com", style: "secondary" },
      { label: "in",                  href: "https://www.linkedin.com/in/nare-kosbekian/",  ariaLabel: "LinkedIn",   style: "secondary", social: "linkedinUrl" }
    ]
  },

  /* ---- Three value props under the hero ------------------------------ */
  highlights: [
    {
      emoji: "💡", // Light Bulb
      title: "Uncover",
      body: "I scale research across continents, building systems that work in markets I can’t access directly. I hire and train local moderators, run tests in languages I don’t speak, then translate findings into decisions that move metrics."
    },
    {
      emoji: "🪄", // Magic Wand
      title: "Lead",
      body: "I grow design teams and research capacity. I mentor designers on strategy, not execution. I scaled design 0→4 while the company grew 10→65+, building processes that let creative thinking happen at every stage."
    },
    {
      emoji: "📊", // Bar Chart
      title: "Deliver",
      body: "I design for scale and iteration. Launch is the beginning, not the end. I track KPIs, gather continuous feedback, and redesign based on what I learn. The product evolves because users guide it."
    }
  ],

  /* ---- Work ---------------------------------------------------------- */
  work: {
    title: "Featured Case Studies",
    linkLabel: "Explore case study",

    projects: [
      {
        slug: "research-system",
        title: "Optimizing the Upgrade Path to Drive Subscription Growth",
        summary: "Research-driven redesign of the payment flow to reduce upgrade hesitation.",
        tags: ["Product Design", "User Testing", "Monetization"],   // landing-page card tags
        // Card cover: ~1330 x 660px (2:1). `bg` frames the image on a solid
        // colour instead of cropping it edge-to-edge — this particular cover
        // is a UI mockup with transparent margins, not a bleed photo.
        cover: { image: "assets/images/work/research-system-cover.webp", alt: "Research system case study", bg: "#C1E3FF" },

        // Real content, ported from the Figma "Work 1" frame (105:2141) —
        // see js/case-study.js for what `badges`, `group` and the `list`
        // shape inside a text block's `body` actually render as.
        caseStudy: {
          links: [
            [
              "Download App: ",
              { text: "App Store", href: "https://apps.apple.com/us/app/alkhattaba-muslim-marriage/id910944079" },
              " - ",
              { text: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.et3arraf.Et3arrafApp&hl=en&gl=US&click_id=08b5092f-0743-4d57-a61f-12b49a6a8861" }
            ],
            [
              "Check website: ",
              { text: "https://www.alkhattaba.com/ENG", href: "https://www.alkhattaba.com/ENG" }
            ]
          ],
          badges: [
            "Product Design", "Subscription/Monetization", "UX Research",
            "User Testing", "A/B Testing", "Usability Testing"
          ],
          blocks: [
            {
              type: "image",
              image: "assets/images/work/research-system-usability-cards.webp",
              alt: "A hand holding a sticky note reading \"Run a usability test\" in front of the Silver, Gold, and Platinum subscription tier cards and the feature comparison table",
              bg: "#C1E3FF",
              height: "200px",
              align: "bottom"
            },
            {
              type: "group",
              blocks: [
                {
                  type: "text",
                  variant: "note",
                  body: ["Due to an NDA, specific metrics and product details have been anonymized. The case study focuses on my research methodology and design thinking."]
                },
                {
                  type: "text",
                  heading: "Contribution & Team",
                  body: [{ lines: ["Role: Lead Product Designer | End-to-end research, UX/UI design, A/B testing, Usability testing.", "Team: Senior UI Designer, Data Analyst, Product Manager, Head of CS"] }]
                },
                {
                  type: "split",
                  left: {
                    heading: "Problem Statement",
                    body: ["The App offered two subscription packages, but app store reviews and customer support tickets revealed persistent user confusion. Users didn't understand what they'd get from each package, thought one was an upgrade of the other, or assumed they already had access to features they didn't. This confusion directly impacted conversion rates and drove churn."]
                  },
                  right: {
                    heading: "Goals & Objectives",
                    body: [
                      "I needed to understand why users were confused and where the friction points were in the subscription flow. My goal was to diagnose the specific UX barriers blocking conversion, then design and validate a solution that reduced confusion and improved subscription adoption.",
                      "Success meant: users could quickly understand the difference between packages, easily compare their options, and confidently make a subscription decision without churn."
                    ]
                  }
                },
                {
                  type: "text",
                  heading: "Impact",
                  body: [{
                    list: "cards",
                    items: [
                      { icon: "assets/icons/cs-impact-trend.svg", text: "Increased conversion rates by addressing the five key friction points identified in user research" },
                      { icon: "assets/icons/cs-impact-compare.svg", text: "Eliminated package confusion by adding feature comparison and clarity-focused UI changes" },
                      { icon: "assets/icons/cs-impact-team.svg", text: "Built design foundations that guided subscription UX across the platform" }
                    ]
                  }]
                }
              ]
            },
            {
              type: "split",
              left: {
                heading: "Testing Focus",
                body: [
                  "I started by surveying ~1,200 users who had reported navigation issues. The survey revealed five main pain points:",
                  {
                    list: "ol",
                    items: [
                      "Users didn't understand what features came with each package",
                      "Users thought one package was an upgrade of the other (not separate options)",
                      "Users perceived the pricing as too expensive",
                      "Users subscribed to one package but thought they had access to features from both",
                      "Users couldn't find where to access the subscription page"
                    ]
                  },
                  "With these pain points clear, my team created high-fidelity wireframes exploring different solutions: revised package positioning, pricing tiers, feature comparison mechanisms, and store page placement. I then conducted moderated usability testing with 10 mixed-gender users, where I moderated while a senior UI designer took structured notes. Users thought aloud as they navigated the prototypes, revealing friction in UI hierarchy, copy clarity, and the comparison workflow.",
                  "Based on those insights, I refined the design and ran a formal A/B test with 20 users on two final directions, testing variations in card UI (colour & pattern), button hierarchy, pricing display, and comparison table placement."
                ]
              },
              right: {
                type: "image",
                image: "assets/images/work/research-system-empathy-map.webp",
                // Real image is 2000x1850 — notably squarer than the split's
                // 624x478 box. `ratio` shows it in full via object-fit:
                // contain instead of cover cropping the THINKS/SAYS or
                // FEELS/DOES columns off the sides; `bg` matches its own
                // white canvas so any letterboxing is invisible.
                ratio: "2000 / 1850",
                bg: "var(--c-white)",
                alt: "Empathy map for the confused subscriber: Thinks — \"Which package is right for me?\", \"Is one an upgrade of the other?\", \"Do I really need this?\", \"Why is this so expensive?\", \"What features exactly will I unlock?\", \"Am I making the right choice?\", \"Where do I even find this?\". Feels — confused by package options, frustrated navigating the flow, uncertain about value, overwhelmed by decisions, hesitant to commit, anxious about cost, stuck (wants to proceed but can't). Says — \"I don't understand the difference between these\", \"This is too expensive\", \"I need to compare these side by side\", \"Where's the subscription page?\", \"Can I try a cheaper option?\", \"This doesn't make sense to me\". Does — abandons subscription flow, goes back and forth between package screens, seeks clarification (reads every detail multiple times), eventually buys anyway (or churns), uses features they don't have (confusion persists post-purchase)"
              }
            },
            {
              type: "text",
              heading: "Insight",
                  body: [
                    "During usability testing, users navigated the prototypes while thinking aloud. I observed consistent friction points:",
                    {
                      list: "impact",
                      items: [
                        "UI & Visual Confusion: Some users were confused by colour choices and visual elements.",
                        "Copy Clarity: Users didn't fully understand what certain features actually did.",
                        "Comparison Workflow: Users repeatedly went back and forth between packages, struggling to compare what they'd get if they upgraded."
                      ]
                    },
                    "These findings showed that even with clearer positioning, users still needed a direct way to compare features side-by-side.",
                    "The A/B test would validate which visual and structural approach worked best."
                  ]
                },
                {
                  type: "split",
                  left: {
                    type: "text",
                    heading: "Design Changes/Decisions",
                    body: [
                      "Based on the insights, I made four core design decisions:",
                      {
                        list: "ol",
                        items: [
                          "Upgrade/Downgrade System: Instead of two separate packages, I restructured them as cumulative tiers so users clearly understood what they gained by upgrading.",
                          "Crossgrade Options: Added pricing flexibility (1 week, 1 month, 1 year subscriptions within each tier) to address the \"too expensive\" feedback and give users affordable entry points.",
                          "Repositioned Store Page: I moved the subscription page to a more discoverable location in the app navigation, addressing the \"can't find it\" pain point.",
                          "Bottom Sheet Triggers: When users tried to use a premium feature, a bottom sheet appeared offering a shortcut to subscribe, reducing friction for intent-driven conversions.",
                          "Comparison Table with Tooltips: I added a feature-by-feature comparison table with an info icon that opened tooltips explaining each feature, directly addressing the comparison workflow friction."
                        ]
                      }
                    ]
                  },
                  right: {
                    type: "image",
                    // ?v=2 cache-busts this — the file was edited in place
                    // (background matted out to transparent) without renaming.
                    image: "assets/images/work/research-system-journey-diagram.png?v=2",
                    // Figma's own box for this is 352px tall — not the raw
                    // image's 707px. `bg: transparent` keeps the contain-fit
                    // (no-crop) treatment without the tint.
                    height: "352px",
                    bg: "transparent",
                    alt: "Diagram: Subscription Decision Journey, before and after — before: user tries premium, pop-up triggered, sees two confusing packages, compares back and forth, gets frustrated, churns or buys confused; after: user tries premium, bottom sheet triggered, views clear cumulative tiers, compares plans and understands features, selects a pricing tier, confident purchase"
                  }
                },
                {
                  type: "split",
                  left: {
                    heading: "A/B Test Results",
                    body: [
                      "I tested final design directions with 20 mixed-gender users:",
                      "Test A:",
                      {
                        list: "ul",
                        items: [
                          "Pastel colours, no pattern element in the background",
                          "\"Compare Plan\" as primary button below packages section",
                          "Final pricing shown inside the package card"
                        ]
                      },
                      "Test B:",
                      {
                        list: "ul",
                        items: [
                          "Vivid but light colours with Islamic background pattern",
                          "\"Compare\" as tertiary button in top right of packages section",
                          "Final pricing shown in primary button (\"Continue for $XYZ\")"
                        ]
                      },
                      "Test B won with 14/20 users choosing it. Users found the pattern more visually distinctive, the tertiary button less bulky, and the pricing in the call-to-action button clearer for transparency before payment."
                    ]
                  },
                  right: {
                    type: "image-row",
                    images: [
                      {
                        // ?v=4 — same filename, replaced content.
                        image: "assets/images/work/research-system-ab-test-1.png?v=4",
                        alt: "Screenshots comparing the Primary Button placement (variant A) against the Tertiary Button placement (variant B) for \"Compare Plans\", with hand-drawn circular-arrow annotations",
                        bg: "#C1E3FF",
                        width: "360.91px",
                        height: "276.47px",
                        align: "bottom"
                      },
                      {
                        // ?v=5 — same filename, replaced content.
                        image: "assets/images/work/research-system-ab-test-2.png?v=5",
                        alt: "Screenshots comparing the total price shown inside the pricing card (variant A) against the total price shown in the \"Continue\" button (variant B), with hand-drawn annotations reading \"Total in card\" and \"Total in Button\"",
                        bg: "#C1E3FF",
                        width: "360.91px",
                        height: "276.47px"
                      }
                    ]
                  }
                },
                {
                  type: "text",
                  heading: "Outcome",
                  body: [
                    "Post-launch, the redesigned subscription flow delivered measurable improvements. By tracking KPI on PowerBI with the help of the data analyst, I noticed that the conversion rates increased, and critically, churn dropped among users who previously couldn't afford the full packages, they now had affordable 1-week entry points that satisfied their needs without abandonment.",
                    "The clearest validation came from support: months after launch, there were no new tickets about package confusion. Users understood their options, made confident decisions, and stayed subscribed.",
                    "The A/B test insights favouring pattern, tertiary button for \"compare plans\", and transparent pricing in the CTA, became the design standard across future subscription features in the app."
                  ]
                },
            {
              type: "image-row",
              images: [
                { video: "assets/images/work/research-system-outcome-1.mp4?v=2", poster: "assets/images/work/research-system-outcome-1-poster.webp", alt: "Screen recording: browsing the plans comparison table and PowerUps on the Store page" },
                { video: "assets/images/work/research-system-outcome-2.mp4?v=2", poster: "assets/images/work/research-system-outcome-2-poster.webp", alt: "Screen recording: the Weekly Power Bundle upsell, subscribing to a 1-week starter plan" },
                { video: "assets/images/work/research-system-outcome-3.mp4?v=2", poster: "assets/images/work/research-system-outcome-3-poster.webp", alt: "Screen recording: reviewing the Platinum plan's full feature list on the Profile page" },
                {
                  image: "assets/images/work/research-system-outcome-compare.webp",
                  bg: "#F0F9FF",
                  alt: "Side-by-side comparison of the Store plans table, the Refine Your Matching Experience upsell, and the Profile plan overview screens"
                }
              ]
            }
          ]
        }
      },

      {
        slug: "verification-flow",
        title: "Decoding User Churn in a Food Delivery App",
        summary: "Qualitative research uncovering the UX pain points driving user abandonment.",
        tags: ["UX Research", "Usability Testing", "User Churn"],   // landing-page card tags
        // `fit: "cover"` fills the whole card (cropping the image's edges) instead of
        // letterboxing it on `bg`; `scale` (e.g. 1.1) enlarges it further about its centre; `shiftX` nudges it sideways.
        cover: { image: "assets/images/usability-testing.png", alt: "Moderated usability testing sessions of the Toters food delivery app", bg: "#CFFCF1", fit: "cover", shiftX: "10px" },

        // Ported from the Figma "Work 2" frame (node 516:796) via its PDF export.
        caseStudy: {
          theme: { "--cs-accent": "#00B492", "--cs-accent-soft": "#ECFCF8", "--cs-cards-gap": "12px", "--cs-text-gap": "0px" },
          links: [
            [
              "Download App: ",
              { text: "App Store", href: "https://apps.apple.com/us/app/toters-%D8%AA%D9%88%D8%AA%D8%B1%D8%B2/id1015006220" },
              " - ",
              { text: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.toters.customer&hl=en" }
            ],
            ["Check website: ", { text: "https://www.totersapp.com/", href: "https://www.totersapp.com/" }]
          ],
          badges: ["UX Research", "UX Design", "User Churn", "User Testing", "Usability Testing", "User Interviews"],
          blocks: [
            {
              type: "image",
              image: "assets/images/image-casestudy2.png",
              alt: "Screens from the Toters food delivery app beside the Toters tomato logo",
              bg: "#99EAD6",
              fit: "cover",
              scale: 1.3,
              shiftY: "-20px",
              height: "200px"
            },
            {
              type: "text",
              heading: "Contribution & Team",
              body: [{ lines: [
                "Role: UX Researcher (solo contractor) | End-to-end research, Usability testing moderator, UX design analysis.",
                "I was handed this project to figure out why Toters was experiencing a significant decline in active users over six months. Working independently, I designed and executed the research from problem scoping through findings and recommendations."
              ] }]
            },
            {
              type: "text",
              heading: "Problem Statement",
              body: ["Toters is a delivery app in Lebanon that connects users with restaurants, grocery stores, and courier services for fast delivery. The app was experiencing a significant decline in active users over six months. Despite previous success attracting users, the app saw steady drops in both new sign-ups and returning customers. Analytics showed increased drop-off rates during key user journey moments, but the why remained unclear. Understanding the root causes was critical to reversing churn and rebuilding retention."]
            },
            {
              type: "text",
              heading: "Goals & Objectives",
              body: [
                { lines: [
                  "The goal of this study was to uncover the reasons behind the recent decline in active users by identifying specific pain points, understanding user attitudes, and evaluating external factors (such as competition or economic changes) affecting retention.",
                  "",
                  "To achieve this, I structured the research around four key domains:"
                ] },
                {
                  list: "ul",
                  flush: true,
                  bullets: true,
                  items: [
                    [{ strong: "User Experience Flow:" }, " Which features or tasks create the most friction in the user journey?"],
                    [{ strong: "User Perception of Features:" }, " How do users feel about the app's features and why?"],
                    [{ strong: "Technical Issues:" }, " What performance problems are users experiencing and how do they affect usage?"],
                    [{ strong: "Competitor Landscape:" }, " What external factors, competition, economics, alternatives are driving abandonment?"]
                  ]
                }
              ]
            },
            {
              type: "text",
              heading: "Impact",
              body: [{
                list: "cards",
                items: [
                  { icon: "assets/icons/search.svg", text: "Identified 5 specific churn drivers through research with 7 participants, revealing operational and feature discoverability as critical barriers." },
                  { icon: "assets/icons/check-box.svg", text: "Provided actionable recommendations with participant consensus, enabling the team to prioritize high-impact retention improvements." },
                  { icon: "assets/icons/list.svg", text: "Established research infrastructure and documented limitations to guide future validation across expanded demographics." }
                ]
              }]
            },
            {
              type: "split",
              gap: "32px",
              left: {
                heading: "Testing Focus",
                body: [{ lines: [
                  "I employed a mixed-methods approach combining qualitative usability testing with competitive analysis and analytics review.",
                  "For the qualitative component, I recruited 7 participants, a mix of churned and active users across Beirut and Mount Lebanon, ages 20–45, representing both iOS and Android users with varying education and occupational backgrounds.",
                  "",
                  "Participants signed consent forms and participated in moderated usability testing sessions where I acted as moderator while taking structured notes. Users thought aloud as they completed key activities: placing an order, adding and removing items from cart, locating and purchasing recharge subscriptions, browsing restaurants, and navigating the checkout flow.",
                  "",
                  "I structured the sessions around four research domains: user experience flow (identifying frustrations and barriers to key tasks), user perception of features, technical performance issues, and the competitive landscape (understanding why users switched to competitors).",
                  "",
                  "Additionally, I reviewed app analytics to identify behavioural patterns and drop-off points, and conducted competitive analysis comparing the app's features, pricing, and user reviews against top regional competitors."
                ] }]
              },
              right: {
                type: "image",
                image: "assets/images/usability-testing.png",
                alt: "Moderated usability testing sessions: Toters app screens (menu, discounts, recharge search) beside video-call tiles of the participants and the moderator",
                bg: "#ECFCF8",
                fit: "cover",
                shiftX: "15px",
                width: "574px",
                height: "400px"
              }
            },
            {
              type: "text",
              heading: "Insight",
              body: [
                "Testing revealed five distinct pain points driving user frustration and churn:",
                {
                  list: "insights",
                  items: [
                    { title: "Delivery Times Exceed Estimates", lines: [
                      "Users experienced deliveries that consistently exceeded the estimated time range. Frustrated by the lack of transparency on reasons for delays, several participants reported switching to competitors offering guaranteed sub-15-minute delivery.",
                      "As one participant noted: \"Delivery time on the checkout page is not accurate.\""
                    ] },
                    { title: "Recharge Subscriptions Are Hidden", lines: [
                      "90% of participants didn't know they could purchase phone recharge subscriptions through the app. The feature was only accessible as an add-on when ordering food, not as a standalone product. Users had switched to dedicated apps for this task.",
                      "One participant stated: \"Assumed he can recharge without ordering food.\""
                    ] },
                    { title: "Frequent Stockouts of Popular Items", lines: [
                      "Items on “Fresh” were regularly marked out of stock and never updated, even weeks later. Participants abandoned the app and switched to competitors like NoKnok and Godzilla to find the items they needed."
                    ] },
                    { title: "Slow Image Loading Hampers Browsing", lines: [
                      "Every testing session revealed the same friction: images took significant time to load. Participants blamed weak internet connections (a reality in Lebanon), but the root cause was unoptimized image file sizes.",
                      "Multiple participants noted: \"Images take time to load and she doesn't order if she doesn't see the images\" and \"slow loading of images slowed down the placing of an order because he didn't know what the item actually was or looked like.\""
                    ] },
                    { title: "Location-Based Favorites and Address Confusion", lines: [
                      "Multiple participants couldn't locate their saved favourites because the feature was tied to the location where they were added, not their current location. Additionally, the app defaulted to the last-used address rather than live location, causing checkout confusion."
                    ] }
                  ]
                }
              ]
            },
            {
              type: "text",
              heading: "Key Recommendations",
              body: [{ lines: [
                "Based on these findings, I proposed five concrete recommendations to address the barriers to retention:",
                "",
                { strong: "1. Delivery Times Exceed Estimates" },
                "Barrier: Users don't know why deliveries are delayed; lack of transparency drives switching to faster competitors.",
                "Design Solution: Implement real-time delivery tracking with dynamic ETA updates that adjust for traffic, order volume, and driver availability. Add status milestones beyond \"Order Confirmed\" and \"Preparing Order\" (e.g., \"Driver assigned,\" \"In transit,\" \"5 min away\") to rebuild user confidence.",
                "",
                { strong: "2. Recharge Subscriptions Are Hidden" },
                "Barrier: 90% of users didn't know this feature existed because it's only accessible as a cart add-on.",
                "Design Solution: Create a dedicated \"Subscriptions\" tab in the main navigation. Allow users to browse, purchase, and manage subscriptions independently without needing a food order. Surface this feature prominently in onboarding or through a banner.",
                "",
                { strong: "3. Frequent Stockouts of Popular Items" },
                "Barrier: Out-of-stock items aren't updated in real-time, wasting user time and driving frustration.",
                "Design Solution: Display real-time stock availability on menu items (e.g., \"Only 3 left\" or \"Out of stock\"). Allow users to set alerts for when items come back in stock. [Note: Requires inventory system integration from operations.]",
                "",
                { strong: "4. Slow Image Loading Hampers Browsing" },
                "Barrier: Unoptimized image sizes create perceived app slowness, especially on weak connections.",
                "Design Solution: Implement progressive image loading with placeholder cards that show item details (name, price, rating) while images load in the background. Use lazy loading so only visible items load initially. [Note: Requires image optimization from engineering.]",
                "",
                { strong: "5. Location-Based Favourites and Address Confusion" },
                "Barrier: Favourites are location-locked; app defaults to last-used address instead of current location.",
                "Design Solution: Build location-aware favourites that show relevant stores based on current GPS location. Add an address management interface where users can save multiple addresses (Home, Work, etc.) and set their current delivery location via GPS or manual entry. Default to the most recently used address within the current location rather than globally."
              ] }]
            },
            {
              type: "text",
              heading: "Reflection",
              body: [
                { lines: [
                  "This research provided valuable insights into user churn drivers, but with important limitations worth noting.",
                  "The participant sample represented high-literacy users ages 20–27, primarily from Beirut and Mount Lebanon areas. These demographics don't represent Toters' full user base, and the findings may not reflect pain points experienced by older users, lower-literacy segments, or users in less urban areas.",
                  "Additionally, this research focused on end users. Future cycles should include perspectives from delivery drivers and restaurant/business owners who list products on the app, as their experience directly impacts user satisfaction.",
                  "",
                  "To strengthen these findings, subsequent research should:"
                ] },
                {
                  list: "ul",
                  flush: true,
                  bullets: true,
                  items: [
                    "Expand age range to capture older user segments",
                    "Recruit from broader geographic areas across Lebanon",
                    "Include drivers and restaurant partners to understand supply-side friction",
                    "Conduct follow-up quantitative validation of the top pain points across a larger sample"
                  ]
                }
              ]
            },
            {
              type: "flow",
              spaceBefore: "30px",
              steps: [
                { phase: "Phase 1", title: "Diagnostic", lines: ["✓ Completed Qualitative testing with 7 users (ages 20-40, high literacy)", "5 pain points identified"] },
                { phase: "Phase 2", title: "Validate & Expand", lines: ["→ Q1 2025: Survey 200+ users, expand geographies (Tripoli, Byblos, Sidon)", "Include ages 45+, competitor mapping, ranked insights"] },
                { phase: "Phase 3", title: "Supply-Side & Impact", lines: ["→ Q2 2025: Interview drivers & restaurant partners", "Measure churn reduction post-launch, full ecosystem view"] }
              ]
            }
          ]
        }
      },

      /* --- The two cards below are still placeholders in the Figma file.
             Fill them in or delete the objects entirely — the grid reflows. */
      {
        slug: "project-three",
        hidden: true,   // not shown on the landing page until it has real content
        title: "Title",
        summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        cover: { image: "assets/images/work/project-three-cover.jpg", alt: "" },
        caseStudy: {
          hero: { image: "assets/images/work/project-three-hero.jpg", alt: "" },
          blocks: [
            { type: "text",  heading: "The problem", body: ["Replace with the context for this project."] },
            { type: "image", image: "assets/images/work/project-three-01.jpg", alt: "" },
            { type: "text",  heading: "The outcome", body: ["Replace with the result."] }
          ]
        }
      },
      {
        slug: "project-four",
        hidden: true,   // not shown on the landing page until it has real content
        title: "Title",
        summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        cover: { image: "assets/images/work/project-four-cover.jpg", alt: "" },
        caseStudy: {
          hero: { image: "assets/images/work/project-four-hero.jpg", alt: "" },
          blocks: [
            { type: "text",  heading: "The problem", body: ["Replace with the context for this project."] },
            { type: "image", image: "assets/images/work/project-four-01.jpg", alt: "" },
            { type: "text",  heading: "The outcome", body: ["Replace with the result."] }
          ]
        }
      }
    ]
  },

  /* ---- About --------------------------------------------------------- */
  about: {
    title: "About me",
    body: [
      "Back in high school, I turned everything into websites on Google Sites. That instinct to structure and share ideas has stayed with me.",
      "Most recently, I spent five years leading product design and research at a tech startup serving 8M+ users worldwide. The work taught me something essential: research rigour beats proximity. I built systems to scale usability testing across three continents, hiring and training local moderators to run sessions in languages I don’t speak, then translating findings into strategy. I designed for 10+ countries, RTL and LTR, across vastly different cultural contexts.",
      "Now, I’m focused on working on products that matter, where research clarity drives decisions and cultural understanding shapes design.",
      "Outside of design, I’m usually exploring galleries, the mountains, and chasing the monthly ice cream flavours!"
    ],
    /* A slow vertical marquee of these 6 photos, replacing the old single
       portrait. Doubled at render time for a seamless loop — only these 6
       need filling in. Square, 180 x 180px each. */
    images: [
      { image: "assets/images/about/gallery-1.webp", alt: "" },
      { image: "assets/images/about/gallery-2.webp", alt: "" },
      { image: "assets/images/about/gallery-3.webp", alt: "" },
      { image: "assets/images/about/gallery-4.webp", alt: "" },
      { image: "assets/images/about/gallery-5.webp", alt: "" },
      { image: "assets/images/about/gallery-6.webp", alt: "" }
    ]
  },

  /* ---- Testimonials -------------------------------------------------- */
  testimonials: {
    title: "Recommendations",
    startIndex: 0,   // which testimonial is shown by default (0-based)
    items: [
      {
        // Square avatar, ~112 x 112px
        avatar: { image: "assets/images/avatars/cedric-maalouf.jpg?v=2", alt: "Cedrid Maalouf" },
        name: "Cedrid Maalouf",
        role: "CEO, ET3Labs (managed Nare directly)",
        quote: "\"I had the pleasure of working with Nare, who joined our team as a UI/UX designer and quickly earned the trust and respect of everyone around her through her talent, attitude, and the quality of her work. She soon grew into the Lead Designer role, taking ownership of the creative direction across our app, web, and marketing materials. Building on a light existing structure, she shaped it into a strong, growing creative team; recruiting, onboarding, and mentoring talented designers along the way.\n\nNare brings a rare combination of creative talent and real leadership, and any team would be lucky to have her.\""
      },
      {
        avatar: { image: "assets/images/avatars/lama-zaher.jpg?v=2", alt: "Lama Zaher" },
        name: "Lama Zaher",
        role: "COO & CPO, ET3Labs (managed Nare directly)",
        quote: "\"I had the pleasure of working with Nare at ET3Labs, where she served as Creative Director and made a significant contribution to the growth of our company and creative unit. Throughout her time with us, she consistently demonstrated professionalism, creativity, and a strong commitment to delivering high-quality work. She played an important role in evolving our brand identity and improving our product UX and UI, adapting her approach as the company and team continued to grow.\nNare was recognised as a collaborative team player with excellent communication and managerial skills. She worked effectively across teams, built positive working relationships, and was always approachable and supportive. Her ability to collaborate with different functions helped ensure projects moved forward smoothly and successfully. She is reliable, dedicated, and a pleasure to work with. I have no doubt she would be a valuable asset to any organisation, and I would gladly recommend her.\""
      },
      {
        avatar: { image: "assets/images/avatars/mohammad-ali-elhussein.jpg?v=2", alt: "Mhmd Ali Elhussein" },
        name: "Mhmd Ali Elhussein",
        role: "Senior UI Designer, ET3Labs (reported to Nare directly)",
        quote: "\"I had the opportunity to work with Nare for three years at ET3 Labs, starting when I joined as a UI/UX Designer and eventually growing into a Senior UI/UX Designer. Throughout those years, Nare was not only my lead designer but also one of the people who had a significant impact on my professional growth. Her eye for detail, strong design thinking, and high standards consistently pushed me to improve my work and think beyond simply making things look good.\nWhat I appreciated most was her ability to guide and challenge the team while giving us the space to develop our own ideas and approaches. Her feedback was always thoughtful and helped me become more confident in making design decisions, communicating my ideas, and taking greater ownership of my work.\nI’m genuinely grateful for the time I spent working with Nare and for everything I learned from her along the way. She is a talented designer, a great mentor, and a strong team leader, and I would highly recommend working with her to anyone looking for a skilled and supportive design leader.\""
      }
    ]
  },

  /* ---- Connect ------------------------------------------------------- */
  connect: {
    title: "Let’s create great things!",
    subtitle: "Open to product and UX/UI design roles",
    actions: [
      { label: "nare.kosbekian@gmail.com", href: "mailto:nare.kosbekian@gmail.com", style: "cta" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nare-kosbekian/", style: "secondary", social: "linkedinUrl" },
      { label: "Résumé", href: "assets/resume.pdf", style: "secondary", newTab: true }
    ]
  },

  /* ---- Footer -------------------------------------------------------- */
  footer: {
    // Distinct from site.logoMark (the favicon/splash brand icon) — this is
    // just the footer's own small image next to the wordmark.
    mark: { image: "assets/brand/footer-avatar.webp?v=2", alt: "" },
    blurb: "Research-driven product designer uncovering insights that shape strategy and drive meaningful impact.",
    columns: [
      {
        heading: "Index",
        items: [
          { label: "Home",    href: "#top"     },
          { label: "Works",   href: "#work"    },
          { label: "About",   href: "#about"   },
          { label: "Contact", href: "#connect" },
          { label: "Resume",  href: "assets/resume.pdf", newTab: true }
        ]
      },
      {
        heading: "Contact",
        items: [
          { label: "nare.kosbekian@gmail.com", href: "mailto:nare.kosbekian@gmail.com" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/nare-kosbekian/", social: "linkedinUrl" },
          { label: "Vancouver, BC" }   // no href = plain text
        ]
      }
    ]
  }
};
