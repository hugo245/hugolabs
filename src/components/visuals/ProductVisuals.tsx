export function WebVisual({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div className={`product-visual web-visual ${compact ? 'product-visual--compact' : ''}`} aria-label="Conceptual website interface created for the HugoLabs service presentation">
      <div className="web-visual__bar"><span /><span /><span /><b>hugolabs.eu / preview</b></div>
      <div className="web-visual__page">
        <nav><strong>HugoLabs</strong><span>Work&nbsp;&nbsp;&nbsp; Studio&nbsp;&nbsp;&nbsp; Contact</span></nav>
        <div className="web-visual__content"><small>Made for an actual business</small><h3>Say what you do.<br />Make the next step obvious.</h3><button type="button" tabIndex={-1}>See the work</button></div>
        <div className="web-visual__aside"><span>Loads quickly</span><span>Works on phones</span><span>Easy to use</span></div>
      </div>
    </div>
  );
}

export function BotVisual({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div className={`product-visual bot-visual ${compact ? 'product-visual--compact' : ''}`} aria-label="Conceptual Discord automation interface created for the HugoLabs service presentation">
      <aside><strong>HL</strong><i /><i /><i /></aside>
      <div className="bot-visual__channels"><b>HugoLabs bot</b><span>Overview</span><span>Tickets</span><span>Automations</span><span>Activity</span></div>
      <div className="bot-visual__feed"><header><div><strong>Automation feed</strong><small>Live</small></div><span>•••</span></header><div className="bot-event"><b>H</b><p><strong>New support request</strong><span>Ticket routed to the right team</span></p><small>now</small></div><div className="bot-event"><b>H</b><p><strong>Member verified</strong><span>Roles and access updated</span></p><small>12s</small></div><div className="bot-event bot-event--active"><b>H</b><p><strong>Workflow complete</strong><span>Five manual steps handled automatically</span></p><small>31s</small></div></div>
    </div>
  );
}

export function SoftwareVisual({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div className={`product-visual software-visual ${compact ? 'product-visual--compact' : ''}`} aria-label="Conceptual desktop software interface created for the HugoLabs service presentation">
      <header><strong>Hugo Operations</strong><span>Search</span><b>HL</b></header>
      <aside><span className="active">Overview</span><span>Workflows</span><span>Records</span><span>Exports</span><span>Settings</span></aside>
      <main><div className="software-visual__heading"><div><small>Today</small><h3>Here’s what needs attention.</h3></div><button type="button" tabIndex={-1}>Add a job</button></div><div className="software-visual__stats"><div><small>Finished today</small><strong>248</strong><span>18% more</span></div><div><small>Admin time saved</small><strong>14.6h</strong><span>This week</span></div><div><small>Waiting for you</small><strong>03</strong><span>Open queue</span></div></div><div className="software-visual__chart"><span /><span /><span /><span /><span /><span /><span /></div></main>
    </div>
  );
}
