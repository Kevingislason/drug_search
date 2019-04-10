import React from 'react'
//
export default function Result(props) {
  const mechanismOrDrug = props.result.isDrug ? 'Drug' : 'Mechanism'
  const id = props.result.isDrug ? props.result.drugId : props.result.id
  const result = props.result
  return (
    <div className="result">
      <div className="result-link">
        <a href={`http://localhost:8080/${mechanismOrDrug}/${id}`}>
          {result.name}
        </a>
        {mechanismOrDrug === 'Drug' ? (
          <div className="drug-category">(Drug, {result.nameType})</div>
        ) : (
          <div className="mechanism-label">(Mechanism)</div>
        )}
      </div>
    </div>
  )
}
