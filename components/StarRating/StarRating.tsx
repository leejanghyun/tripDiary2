import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

interface StarRatingProps {
  totalStars?: number;
  size?: number;
  gap?: number;
  initialRating?: number;
  disabled?: boolean;
  onChange?: (rating: number) => void;
}

export const DEFAULT_TOTAL_STARS = 5
const DEFAULT_STAR_INIT = 0

function StarRating({
  totalStars = DEFAULT_TOTAL_STARS,
  gap,
  initialRating = DEFAULT_STAR_INIT,
  size = 24,
  disabled = false,
  onChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)

  useEffect(() => {
    setRating(initialRating)
  }, [initialRating])

  const handleClick = (selectedRating: number) => {
    if (disabled) {
      return
    }
    setRating(selectedRating)
    onChange?.(selectedRating)
  }

  return (
    <StarRatingBlock gap={gap}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          size={size}
          disabled={disabled}
          key={index}
          filled={index < rating}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </StarRatingBlock>
  )
}

const StarRatingBlock = styled.div<{ gap?: number }>`
  display: inline-flex;
  gap: ${({ gap = 10 }) => `${gap}px;`};
`

interface StarProps {
  filled: boolean;
  disabled: boolean;
  size?: number;
  onClick?: () => void
}

function Star({
  filled,
  disabled,
  size,
  onClick,
}: StarProps) {
  const starClassName = filled ? 'star filled' : 'star'

  return (
    <StarButton
      disabled={disabled}
      type="button"
      className={starClassName}
      size={size}
      onClick={onClick}
    >
      &#9733;
    </StarButton>
  )
}

const StarButton = styled.button<{ size?: number }>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: #aaa;
  transition: color 0.2s;
  font-size: ${({ size = 24 }) => `${size}px;`};

  &:hover {
    color: ${({ disabled }) => (disabled ? '#aaa' : '#ffc107')};
  }

  &.filled {
    color: #ffc107;
  }
}`

export default StarRating
