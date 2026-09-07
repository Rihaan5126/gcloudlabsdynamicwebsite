type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onSelect: (tag: string | null) => void;
};

export function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter projects by technology"
    >
      <FilterChip
        label="All"
        isActive={activeTag === null}
        onClick={() => onSelect(null)}
      />
      {tags.map((tag) => (
        <FilterChip
          key={tag}
          label={tag}
          isActive={activeTag === tag}
          onClick={() => onSelect(tag)}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`focus-ring rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
        isActive
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
