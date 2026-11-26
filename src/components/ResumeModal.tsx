import { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import {
  EXPERIENCE_TIMELINE,
  Lang,
  PROFILE,
  PROJECTS,
  STACK_GROUPS,
} from '../data/portfolio';
import { cyberAudio } from '../utils/sound';

interface ResumeModalProps {
  open: boolean;
  lang: Lang;
  onClose: () => void;
  onSetLang: (next: Lang) => void;
}

export function ResumeModal({ open, lang, onClose, onSetLang }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const experienceEntries = EXPERIENCE_TIMELINE.filter((item) => item.type !== 'education');
  const educationEntry = EXPERIENCE_TIMELINE.find((item) => item.type === 'education');
  const selectedProjects = PROJECTS.slice(0, 6);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Printable ATS Resume"
      className="ats-resume-overlay"
      onClick={onClose}
    >
      <div
        className="ats-resume-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screen-only HUD Toolbar */}
        <div className="ats-resume-toolbar no-print">
          <div className="ats-toolbar-title">
            ATS_RESUME // {PROFILE.fullName.toUpperCase()}
          </div>

          <div className="ats-toolbar-actions">
            <button
              type="button"
              className="modal-hud-btn"
              onClick={() => {
                cyberAudio.playClickBlip();
                onSetLang(lang === 'en' ? 'id' : 'en');
              }}
            >
              <span>LANG: {lang.toUpperCase()}</span>
            </button>

            <button
              type="button"
              className="volt-cta"
              style={{ padding: '8px 14px', fontSize: '0.74rem' }}
              onClick={() => {
                cyberAudio.playClickBlip();
                window.print();
              }}
            >
              <Printer size={14} />
              <span>{lang === 'id' ? 'CETAK / SIMPAN PDF' : 'PRINT / SAVE PDF'}</span>
            </button>

            <button
              type="button"
              className="modal-hud-btn"
              onClick={() => {
                cyberAudio.playClickBlip();
                onClose();
              }}
              aria-label="Close resume modal"
            >
              <span>ESC</span>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Clean White Printable ATS Sheet */}
        <article className="ats-resume-sheet">
          <header className="ats-header">
            <h1>{PROFILE.fullName}</h1>
            <div className="ats-role-line">
              {lang === 'id'
                ? 'Software & Systems Engineer | Mahasiswa S1 Teknik Informatika'
                : 'Software & Systems Engineer | Informatics Engineering Undergraduate'}
            </div>
            <div className="ats-contact-line">
              <span>Makassar, Indonesia</span>
              <span>|</span>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <span>|</span>
              <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
                github.com/andiakbararyaputra
              </a>
              <span>|</span>
              <a href={PROFILE.portfolioUrl} target="_blank" rel="noreferrer">
                andiakbararyaputra.github.io
              </a>
            </div>
          </header>

          <section className="ats-section">
            <h2>{lang === 'id' ? 'RINGKASAN PROFIL' : 'PROFESSIONAL SUMMARY'}</h2>
            <p>{PROFILE.summary[lang]}</p>
          </section>

          <section className="ats-section">
            <h2>{lang === 'id' ? 'PENDIDIKAN' : 'EDUCATION'}</h2>
            <div className="ats-entry-header">
              <strong>{PROFILE.education.institution}</strong>
              <span>{PROFILE.education.period[lang]}</span>
            </div>
            <div className="ats-entry-sub">{PROFILE.education.degree[lang]}</div>
            {educationEntry && (
              <ul>
                {educationEntry.bullets[lang].map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>

          <section className="ats-section">
            <h2>{lang === 'id' ? 'PENGALAMAN & RISET' : 'EXPERIENCE & RESEARCH'}</h2>
            {experienceEntries.map((entry) => (
              <div key={entry.id} className="ats-entry">
                <div className="ats-entry-header">
                  <strong>
                    {entry.role[lang]} ({entry.org[lang]})
                  </strong>
                  <span>{entry.period[lang]}</span>
                </div>
                <ul>
                  {entry.bullets[lang].map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="ats-section">
            <h2>{lang === 'id' ? 'PROYEK PILIHAN' : 'SELECTED PROJECTS'}</h2>
            {selectedProjects.map((project) => (
              <div key={project.id} className="ats-project-item">
                <div className="ats-entry-header">
                  <strong>{project.title}</strong>
                  <span>{project.stack.slice(0, 4).join(', ')}</span>
                </div>
                <p>
                  {project.tagline[lang]} ({project.metrics[lang][0]})
                </p>
              </div>
            ))}
          </section>

          <section className="ats-section">
            <h2>{lang === 'id' ? 'KEAHLIAN TEKNIS' : 'TECHNICAL SKILLS'}</h2>
            <div className="ats-skills-list">
              {STACK_GROUPS.map((group) => (
                <div key={group.id} className="ats-skill-row">
                  <strong>{group.label[lang].replace(/^\d+\s*\/\/\s*/, '')}: </strong>
                  <span>{group.items.map((item) => item.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
