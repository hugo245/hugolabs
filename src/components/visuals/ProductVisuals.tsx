export function WebVisual({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div className={`product-visual web-visual ${compact ? 'product-visual--compact' : ''}`} aria-label="Conceptual website interface created for the HugoLabs service presentation">
      <div className="web-visual__bar"><span /><span /><span /><b>hugolabs.eu / preview</b></div>
      <div className="web-visual__page">
        <nav><strong>HugoLabs</strong><span>Work&nbsp;&nbsp;&nbsp; Studio&nbsp;&nbsp;&nbsp; Contact</span></nav>
        <div className="web-visual__content"><small>Built for the business</small><h3>A clear site.<br />A specific point of view.</h3><button type="button" tabIndex={-1}>View the approach</button></div>
        <div className="web-visual__aside"><span>Fast</span><span>Responsive</span><span>Accessible</span></div>
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
      <main><div className="software-visual__heading"><div><small>Workspace</small><h3>Good morning.</h3></div><button type="button" tabIndex={-1}>New workflow</button></div><div className="software-visual__stats"><div><small>Processed today</small><strong>248</strong><span>+18%</span></div><div><small>Time returned</small><strong>14.6h</strong><span>This week</span></div><div><small>Needs review</small><strong>03</strong><span>Open queue</span></div></div><div className="software-visual__chart"><span /><span /><span /><span /><span /><span /><span /></div></main>
    </div>
  );
}
