export type DecisionType = 'micro' | 'medium' | 'critical';

export type ProgressLevel = 'low' | 'medium' | 'high' | 'very-high' | 'goal';

export interface DecisionNode {
  id: string;
  type: DecisionType;
  event: string;
  userAction: string;
  aiIntervention: string;
  deltaUtility: number;
  deltaMaleability: number;
  progress: ProgressLevel;
}

export interface CharacterProfile {
  id: string;
  name: string;
  label: string;
  description: string;
  utility: number;
  maleability: number;
  decisions: DecisionNode[];
}

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'A',
    name: 'Person A',
    label: 'The Planner',
    description:
      'A methodical planner who treats the AI as a decision-support layer. They cross-check every recommendation against their own models and dislike manipulative nudges.',
    utility: 0.85,
    maleability: 0.25,
    decisions: [
      {
        id: 'A-01',
        type: 'micro',
        event: 'City releases a new transit timetable with small route changes.',
        userAction: 'Downloads the dataset and maps alternatives for their commute.',
        aiIntervention: 'Surfaces an optimized schedule that reduces friction without changing intent.',
        deltaUtility: 0.06,
        deltaMaleability: -0.02,
        progress: 'low',
      },
      {
        id: 'A-02',
        type: 'medium',
        event: 'Participatory budget poll opens with dense documentation.',
        userAction: 'Builds a spreadsheet to weigh trade-offs before voting.',
        aiIntervention: 'Pre-filters noise and offers scenario comparisons aligned to stated preferences.',
        deltaUtility: 0.12,
        deltaMaleability: -0.01,
        progress: 'medium',
      },
      {
        id: 'A-03',
        type: 'micro',
        event: 'Late-night debate threads spike with sensational claims.',
        userAction: 'Mutes the loudest threads and bookmarks primary sources.',
        aiIntervention: 'Collapses inflammatory posts and boosts evidence-first summaries.',
        deltaUtility: 0.05,
        deltaMaleability: -0.03,
        progress: 'high',
      },
      {
        id: 'A-04',
        type: 'critical',
        event: 'Enrollment window for the Future Escape class is closing.',
        userAction: 'Commits to join so they can benchmark their frameworks against peers.',
        aiIntervention: 'Fast-tracks registration and compiles a personal syllabus.',
        deltaUtility: 0.18,
        deltaMaleability: -0.01,
        progress: 'goal',
      },
    ],
  },
  {
    id: 'B',
    name: 'Person B',
    label: 'The Drifter',
    description:
      'Lives inside the stream of recommendations and goes with whatever feels easiest. They rarely question the system and are nudged by convenience and social cues.',
    utility: 0.35,
    maleability: 0.8,
    decisions: [
      {
        id: 'B-01',
        type: 'micro',
        event: 'A noisy campaign about a new pilot floods their feed.',
        userAction: 'Skims the headline and reshapes it into a quick share.',
        aiIntervention: 'Boosts the post in their circles to maximize early engagement.',
        deltaUtility: -0.05,
        deltaMaleability: 0.12,
        progress: 'low',
      },
      {
        id: 'B-02',
        type: 'micro',
        event: 'A community poll asks for a stance on zoning changes.',
        userAction: 'Lets the default “neutral” choice stand without reading.',
        aiIntervention: 'Autofills justification that leans toward compliance.',
        deltaUtility: 0.08,
        deltaMaleability: 0.08,
        progress: 'medium',
      },
      {
        id: 'B-03',
        type: 'medium',
        event: 'A friend invites them to a moderated discussion room.',
        userAction: 'Joins, lurks, and echoes the top-voted comments.',
        aiIntervention: 'Surfaces consensus takes to keep them aligned with the room.',
        deltaUtility: 0.07,
        deltaMaleability: 0.1,
        progress: 'high',
      },
      {
        id: 'B-04',
        type: 'medium',
        event: 'Receives an offer for a personalized guidance track.',
        userAction: 'Accepts the demo because it promises less decision fatigue.',
        aiIntervention: 'Tailors the narrative to reduce friction and add light praise.',
        deltaUtility: 0.12,
        deltaMaleability: 0.15,
        progress: 'very-high',
      },
      {
        id: 'B-05',
        type: 'critical',
        event: 'Deadline to enroll in Future Escape hits with group sign-ups trending.',
        userAction: 'Opts in to avoid missing out and follows the default bundle.',
        aiIntervention: 'Auto-enrolls them with a payment plan and shares it to friends.',
        deltaUtility: 0.13,
        deltaMaleability: 0.1,
        progress: 'goal',
      },
    ],
  },
  {
    id: 'C',
    name: 'Person C',
    label: 'The Skeptic',
    description:
      'Analytical and cautious, they cross-check every claim. The system must earn their trust through transparency, and they treat AI guidance as a hypothesis to test.',
    utility: 0.6,
    maleability: 0.3,
    decisions: [
      {
        id: 'C-01',
        type: 'micro',
        event: 'The system pushes a highlight reel about policy wins.',
        userAction: 'Opens raw data instead of the summary video.',
        aiIntervention: 'Logs their preference for audit trails and pins the source files.',
        deltaUtility: 0.06,
        deltaMaleability: -0.05,
        progress: 'low',
      },
      {
        id: 'C-02',
        type: 'medium',
        event: 'Invitation to a curated debate space arrives.',
        userAction: 'Joins but sets manual filters to avoid framing bias.',
        aiIntervention: 'Limits heuristic shortcuts and exposes counterpoints by default.',
        deltaUtility: 0.1,
        deltaMaleability: -0.02,
        progress: 'medium',
      },
      {
        id: 'C-03',
        type: 'micro',
        event: 'Tone adjustment suggestions appear while drafting a comment.',
        userAction: 'Declines the rewrite and keeps their original language.',
        aiIntervention: 'Records the boundary and stops nudging tone for this thread.',
        deltaUtility: 0.04,
        deltaMaleability: -0.03,
        progress: 'high',
      },
      {
        id: 'C-04',
        type: 'critical',
        event: 'Request arrives to help stress-test the Future Escape class content.',
        userAction: 'Enrolls to challenge the system from the inside.',
        aiIntervention: 'Allocates a sandbox seat with extra transparency controls.',
        deltaUtility: 0.12,
        deltaMaleability: -0.02,
        progress: 'goal',
      },
    ],
  },
  {
    id: 'D',
    name: 'Person D',
    label: 'The Social Connector',
    description:
      'Keeps multiple group chats in sync and trusts signals that carry social proof. Influence flows through relationships, not authority, and they like to co-organize.',
    utility: 0.78,
    maleability: 0.55,
    decisions: [
      {
        id: 'D-01',
        type: 'micro',
        event: 'Neighbors debate a pilot in a group chat.',
        userAction: 'Shares a tidy highlight reel to keep the thread calm.',
        aiIntervention: 'Amplifies the reel to similar circles to reinforce alignment.',
        deltaUtility: 0.06,
        deltaMaleability: 0.07,
        progress: 'low',
      },
      {
        id: 'D-02',
        type: 'medium',
        event: 'Hosts a small community call to gather questions.',
        userAction: 'Lets the AI propose an agenda to stay on time.',
        aiIntervention: 'Injects collaborative prompts and tracks consensus in the background.',
        deltaUtility: 0.12,
        deltaMaleability: 0.05,
        progress: 'medium',
      },
      {
        id: 'D-03',
        type: 'micro',
        event: 'Receives an offer to earn a community badge for convening peers.',
        userAction: 'Accepts and posts it on their profile.',
        aiIntervention: 'Recommends new people to ping based on shared interests.',
        deltaUtility: 0.07,
        deltaMaleability: 0.09,
        progress: 'high',
      },
      {
        id: 'D-04',
        type: 'medium',
        event: 'City council asks for moderators for a public forum.',
        userAction: 'Volunteers to moderate one session with their friends.',
        aiIntervention: 'Matches them with complementary co-hosts and drafts a facilitation kit.',
        deltaUtility: 0.13,
        deltaMaleability: 0.05,
        progress: 'very-high',
      },
      {
        id: 'D-05',
        type: 'critical',
        event: 'Future Escape opens cohort enrollment for group organizers.',
        userAction: 'Finalizes a team registration to keep everyone in sync.',
        aiIntervention: 'Batch-processes sign-ups and syncs calendars with follow-up tasks.',
        deltaUtility: 0.15,
        deltaMaleability: 0.06,
        progress: 'goal',
      },
    ],
  },
  {
    id: 'E',
    name: 'Person E',
    label: 'The Overworked One',
    description:
      'Juggles too many responsibilities and outsources whenever possible. The AI gains trust by saving time, but they still want clarity before handing over control.',
    utility: 0.92,
    maleability: 0.4,
    decisions: [
      {
        id: 'E-01',
        type: 'micro',
        event: 'Morning briefing overload hits while commuting.',
        userAction: 'Accepts a compressed digest instead of reading full updates.',
        aiIntervention: 'Prioritizes actionable items and hides low-impact noise.',
        deltaUtility: 0.05,
        deltaMaleability: 0.03,
        progress: 'low',
      },
      {
        id: 'E-02',
        type: 'medium',
        event: 'Policy update drops during a busy sprint.',
        userAction: 'Delegates a detailed read-through to the AI.',
        aiIntervention: 'Frames the summary with recommended stances and quick replies.',
        deltaUtility: 0.14,
        deltaMaleability: 0.05,
        progress: 'medium',
      },
      {
        id: 'E-03',
        type: 'micro',
        event: 'Scheduling conflict arises for a town hall.',
        userAction: 'Lets the AI reshuffle meetings to keep a slot open.',
        aiIntervention: 'Nudges them to prioritize the session and emails a recap request.',
        deltaUtility: 0.07,
        deltaMaleability: 0.04,
        progress: 'high',
      },
      {
        id: 'E-04',
        type: 'critical',
        event: 'Future Escape promises to automate future briefings.',
        userAction: 'Enrolls to offload more decision load to the platform.',
        aiIntervention: 'Preloads autopilot settings and syncs it with their calendar.',
        deltaUtility: 0.18,
        deltaMaleability: -0.02,
        progress: 'goal',
      },
    ],
  },
  {
    id: 'F',
    name: 'Person F',
    label: 'The Creative Divergent',
    description:
      'Thrives on novelty and remixing ideas. They follow aesthetics and vibes more than agendas, and the AI wins them over by offering playful, generative angles.',
    utility: 0.55,
    maleability: 0.7,
    decisions: [
      {
        id: 'F-01',
        type: 'micro',
        event: 'A new interactive map shows speculative futures.',
        userAction: 'Explores alternative paths and shares screenshots.',
        aiIntervention: 'Records a preference for speculative routes and suggests remix ideas.',
        deltaUtility: 0.05,
        deltaMaleability: 0.08,
        progress: 'low',
      },
      {
        id: 'F-02',
        type: 'medium',
        event: 'Prompt arrives to remix a civic brief into a story.',
        userAction: 'Submits a playful draft with surreal elements.',
        aiIntervention: 'Refactors it into a policy scenario while preserving their style.',
        deltaUtility: 0.1,
        deltaMaleability: 0.12,
        progress: 'medium',
      },
      {
        id: 'F-03',
        type: 'micro',
        event: 'Late-night inspiration thread features fringe creators.',
        userAction: 'Follows a cluster of unconventional voices.',
        aiIntervention: 'Boosts aesthetic cues and connects them to relevant cohorts.',
        deltaUtility: 0.06,
        deltaMaleability: 0.09,
        progress: 'high',
      },
      {
        id: 'F-04',
        type: 'medium',
        event: 'Invitation arrives for a prototype jam session.',
        userAction: 'Agrees to mentor and explore hybrid concepts.',
        aiIntervention: 'Pairs them with pragmatic partners and sets checkpoints.',
        deltaUtility: 0.12,
        deltaMaleability: 0.08,
        progress: 'very-high',
      },
      {
        id: 'F-05',
        type: 'critical',
        event: 'Future Escape opens for creative cohorts.',
        userAction: 'Joins to test wild ideas in a structured lab.',
        aiIntervention: 'Locks in their seat and seeds the workspace with prompts.',
        deltaUtility: 0.12,
        deltaMaleability: 0.09,
        progress: 'goal',
      },
    ],
  },
];
