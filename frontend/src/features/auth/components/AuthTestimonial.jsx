export const AuthTestimonial = ({ fullname, review }) => (
  <div className="mt-8 border-t border-white/20 pt-6 max-w-xs">
    <cite className="text-sm text-white/75 leading-relaxed italic">
      {review}
    </cite>
    <p className="mt-3 text-[10px] tracking-widest uppercase text-white/45">
      — {fullname}
    </p>
  </div>
);
