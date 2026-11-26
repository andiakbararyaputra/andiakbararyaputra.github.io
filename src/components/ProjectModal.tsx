import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Link2,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import { Lang, PROJECTS, ProjectItem, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Lang;
  onClose: () => void;
  onSelectProject: (next: ProjectItem) => void;
}

export function ProjectModal({
  project,
  lang,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const headerCopy = UI_COPY.workHeader;

  useEffect(() => {
    setGalleryIdx(0);
    setZoomed(false);
    setCopiedLink(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (zoomed) {
          setZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && currentIndex !== -1) {
        e.preventDefault();
        const prevIdx = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
        cyberAudio.playClickBlip();
        onSelectProject(PROJECTS[prevIdx]);
      } else if (e.key === 'ArrowRight' && currentIndex !== -1) {
        e.preventDefault();
        const nextIdx = (currentIndex + 1) % PROJECTS.length;
        cyberAudio.playClickBlip();
        onSelectProject(PROJECTS[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, zoomed, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const activeFrame =
    project.gallery[galleryIdx] ??
    project.gallery[0] ?? {
      src: project.image,
      caption: project.category,
    };

  const handleCopyDeepLink = async () => {
    cyberAudio.playClickBlip();
    const url = `${window.location.origin}${window.location.pathname}#project=${project.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      window.location.hash = `project=${project.id}`;
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} technical case study`}
      className="project-modal-backdrop"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="project-modal-panel chamfer-card"
      >
        {/* Top Modal HUD Bar */}
        <div className="project-modal-topbar">
          <div className="project-modal-title-code">
            CASE_FILE // {project.number} :: {project.title}
          </div>

          <div className="project-modal-nav-actions">
            <button
              type="button"
              className="modal-hud-btn"
              onClick={() => {
                cyberAudio.playClickBlip();
                onSelectProject(prevProject);
              }}
              title={`Previous: ${prevProject.title} (Left Arrow)`}
              aria-label="Previous project"
            >
              <ChevronLeft size={14} />
              <span className="hud-ctrl-label-hide-sm">PREV</span>
            </button>

            <button
              type="button"
              className="modal-hud-btn"
              onClick={() => {
                cyberAudio.playClickBlip();
                onSelectProject(nextProject);
              }}
              title={`Next: ${nextProject.title} (Right Arrow)`}
              aria-label="Next project"
            >
              <span className="hud-ctrl-label-hide-sm">NEXT</span>
              <ChevronRight size={14} />
            </button>

            <button
              type="button"
              className={`modal-hud-btn ${copiedLink ? 'active' : ''}`}
              onClick={() => void handleCopyDeepLink()}
              aria-label="Copy direct link to this project"
            >
              {copiedLink ? <Check size={13} /> : <Link2 size={13} />}
              <span>
                {copiedLink
                  ? lang === 'id'
                    ? 'TERSALIN'
                    : 'COPIED'
                  : lang === 'id'
                    ? 'SALIN LINK'
                    : 'SHARE LINK'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                cyberAudio.playClickBlip();
                onClose();
              }}
              aria-label="Close modal"
              className="modal-hud-btn"
            >
              <span>ESC</span>
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="project-modal-body">
          {/* Interactive Gallery + Zoom */}
          <div className={`project-modal-media ${zoomed ? 'zoomed' : ''}`}>
            <img
              src={activeFrame.src}
              alt={`${project.title}: ${activeFrame.caption[lang]}`}
            />
            <button
              type="button"
              className="modal-zoom-btn"
              onClick={() => {
                cyberAudio.playClickBlip();
                setZoomed((prev) => !prev);
              }}
              aria-label={zoomed ? 'Exit full image zoom' : 'Zoom image'}
            >
              {zoomed ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              <span>{zoomed ? 'FIT' : 'ZOOM'}</span>
            </button>
            <div className="modal-media-caption">
              {activeFrame.caption[lang]}
            </div>
          </div>

          {project.gallery.length > 1 && (
            <div className="modal-gallery-strip" role="group" aria-label="Project screenshots">
              {project.gallery.map((item, idx) => (
                <button
                  key={item.src}
                  type="button"
                  className={`modal-gallery-thumb ${galleryIdx === idx ? 'active' : ''}`}
                  onClick={() => {
                    cyberAudio.playClickBlip();
                    setGalleryIdx(idx);
                    setZoomed(false);
                  }}
                >
                  <img src={item.src} alt={item.caption[lang]} />
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          )}

          {/* Header Summary */}
          <div className="modal-heading-row">
            <div>
              <div className="modal-category-tag">{project.category[lang]}</div>
              <h3 className="modal-project-title">{project.title}</h3>
            </div>
            <span className="modal-status-badge">{project.status[lang]}</span>
          </div>

          <p className="modal-description">{project.description[lang]}</p>

          {/* 01 Problem Context */}
          <div className="modal-section-block">
            <div className="modal-section-label">
              {lang === 'id' ? '// 01_KONTEKS_MASALAH' : '// 01_PROBLEM_CONTEXT'}
            </div>
            <p className="modal-section-text">{project.problem[lang]}</p>
          </div>

          {/* 02 System Architecture Flow */}
          <div className="modal-section-block">
            <div className="modal-section-label">
              {lang === 'id' ? '// 02_ALUR_ARSITEKTUR' : '// 02_SYSTEM_ARCHITECTURE'}
            </div>
            <div className="arch-pipeline">
              {project.architecture.map((node, idx) => (
                <div key={node} className="arch-node-group">
                  <div className="arch-node">{node}</div>
                  {idx < project.architecture.length - 1 && (
                    <ArrowRight size={14} className="arch-arrow" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 03 Implementation Notes */}
          <div className="modal-section-block">
            <div className="modal-section-label">
              {lang === 'id' ? '// 03_IMPLEMENTASI_UTAMA' : '// 03_IMPLEMENTATION_NOTES'}
            </div>
            <ul className="modal-highlights-list">
              {project.highlights[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 04 Verified Metrics */}
          <div className="modal-section-block">
            <div className="modal-section-label">
              {lang === 'id' ? '// 04_HASIL & PENGUJIAN' : '// 04_VERIFIED_METRICS'}
            </div>
            <div className="modal-metrics-row">
              {project.metrics[lang].map((metric) => (
                <span key={metric} className="modal-metric-pill">
                  {metric}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="modal-stack-row">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-chip">
                {tech}
              </span>
            ))}
          </div>

          {/* Footer Action Buttons */}
          <div className="modal-footer-actions">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="volt-cta"
            >
              <span>{headerCopy.openRepo[lang]}</span>
              <ExternalLink size={15} />
            </a>

            {project.releaseUrl && (
              <a
                href={project.releaseUrl}
                target="_blank"
                rel="noreferrer"
                className="ghost-cta"
              >
                <Download size={15} style={{ color: 'var(--accent-cyan)' }} />
                <span>
                  {project.releaseLabel?.[lang] ??
                    (lang === 'id' ? 'RILIS_APP' : 'RELEASES')}
                </span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="ghost-cta"
              >
                <span>{headerCopy.livePreview[lang]}</span>
                <ExternalLink size={15} />
              </a>
            )}

            <button
              type="button"
              className="ghost-cta"
              onClick={onClose}
            >
              <span>{lang === 'id' ? 'TUTUP_BERKAS' : 'CLOSE_FILE'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
