import React, { useState, useRef } from 'react'

function UploadSection() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  // Determine user-friendly file category based on MIME type or extension
  const getFileTypeCategory = (file) => {
    if (!file) return ''
    const { type, name } = file

    if (type.startsWith('image/')) return 'Image'
    if (type.startsWith('video/')) return 'Video'
    if (type.startsWith('audio/')) return 'Audio'
    if (type.includes('pdf')) return 'PDF Document'
    if (
      type.includes('word') ||
      type.includes('officedocument') ||
      name.endsWith('.docx') ||
      name.endsWith('.doc')
    ) {
      return 'Word Document'
    }
    if (type.startsWith('text/') || name.endsWith('.txt')) return 'Text Document'

    return 'Other / Document'
  }

  // Handle file selection from browse dialog
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  // Backend submission placeholder
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('fileType', getFileTypeCategory(selectedFile))
    formData.append('fileName', selectedFile.name)

    console.log('FormData ready for backend:', {
      file: formData.get('file'),
      fileType: formData.get('fileType'),
      fileName: formData.get('fileName')
    })
  }

  const hasFile = Boolean(selectedFile)

  return (
    // Outer flex wrapper taking 100% width and 100% available height with zero gap
    <div className="flex flex-row w-full h-full p-6">
      {/* ----------------- LEFT: UPLOAD CARD (50% width, full height) ----------------- */}
      <div className="w-1/2 h-full bg-card-surface rounded-l-2xl p-8 border border-r-0 border-accent/30 flex flex-col justify-between shadow-lg shadow-card-surface/40">
        <div>
          <h2 className="text-2xl font-bold text-secondary-text">Upload File</h2>
          <p className="text-sm text-accent mt-1">
            Upload documents you want to share with your team
          </p>
        </div>

        {/* Drag and drop zone stretching to occupy vertical space */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`my-6 flex-1 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 text-center ${
            isDragging
              ? 'border-primary-text bg-background/60'
              : 'border-accent/40 bg-background/30'
          }`}
        >
          {/* Upload Cloud / Arrow Icon */}
          <div className="w-14 h-14 text-secondary-text/70 flex items-center justify-center mb-3">
            <svg
              className="w-12 h-12 stroke-current"
              fill="none"
              strokeWidth="1.75"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>

          <p className="text-secondary-text font-medium text-sm">
            Drag and drop file here
          </p>
          <span className="text-xs text-accent my-2 font-semibold">
            -OR-
          </span>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 bg-secondary-text hover:bg-secondary-text/90 text-background rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Browse Files
          </button>

          {/* Confirmation of selected file */}
          {hasFile && (
            <p className="mt-4 text-xs font-semibold text-primary-text bg-background/80 px-3 py-1.5 rounded-lg border border-primary-text/40 truncate max-w-full">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        <p className="text-xs text-accent/80 text-center">
          Supported files: Documents, Images, Audio, Video
        </p>
      </div>

      {/* ----------------- RIGHT: DETAILS FORM (50% width, full height) ----------------- */}
      <form
        onSubmit={handleSubmit}
        className="w-1/2 h-full bg-card-surface rounded-r-2xl p-8 border border-accent/30 flex flex-col justify-between shadow-lg shadow-card-surface/40"
      >
        <div>
          <h2 className="text-2xl font-bold text-secondary-text">File Details</h2>
          <p className="text-sm text-accent mt-1">
            Review metadata before sending
          </p>

          <div className="flex flex-col gap-6 mt-8">
            {/* Detected File Category */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="fileType"
                className={`text-sm font-semibold transition-colors ${
                  hasFile ? 'text-secondary-text' : 'text-accent/60'
                }`}
              >
                File Type
              </label>
              <input
                id="fileType"
                type="text"
                readOnly
                disabled={!hasFile}
                value={getFileTypeCategory(selectedFile)}
                placeholder="Upload a file first to detect type"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  hasFile
                    ? 'bg-background border-accent/40 text-secondary-text focus:outline-none'
                    : 'bg-background/40 border-accent/20 text-accent/50 cursor-not-allowed'
                }`}
              />
            </div>

            {/* Original File Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="fileName"
                className={`text-sm font-semibold transition-colors ${
                  hasFile ? 'text-secondary-text' : 'text-accent/60'
                }`}
              >
                File Name
              </label>
              <input
                id="fileName"
                type="text"
                readOnly
                disabled={!hasFile}
                value={selectedFile ? selectedFile.name : ''}
                placeholder="No file chosen"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  hasFile
                    ? 'bg-background border-accent/40 text-secondary-text focus:outline-none'
                    : 'bg-background/40 border-accent/20 text-accent/50 cursor-not-allowed'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!hasFile}
            className={`w-full py-3.5 px-5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              hasFile
                ? 'bg-primary-text hover:bg-primary-text/90 text-white shadow-md active:scale-[0.99] cursor-pointer hover:shadow-card-surface hover:shadow-md'
                : 'bg-accent/30 text-accent/70 cursor-not-allowed opacity-60'
            }`}
          >
            {hasFile ? 'Submit File' : 'Upload a File to Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadSection