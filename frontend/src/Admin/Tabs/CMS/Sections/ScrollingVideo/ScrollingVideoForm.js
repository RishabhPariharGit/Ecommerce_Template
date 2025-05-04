import React, { useState, useEffect, useRef } from 'react';
import {
  addScrollingVideo,
  updateScrollingVideo,
  getScrollingVideoById,
} from '../../../../../Services/AdminServices/Allservices/ScrollingVideoService';
import '../../../../AdminStyle/AdminGlobalStyle.css';
import { useNavigate, useParams } from 'react-router-dom';

const ScrollingVideoForm = ({ isEditMode = false }) => {
  const [previewSource, setPreviewSource] = useState('');
  const [formData, setFormData] = useState({
    Text: '',
    Video: '',
    Status: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const { Id } = useParams();
  const navigate = useNavigate();
  const isFetchedRef = useRef(false); // Track if data has already been fetched

  // Load ScrollingVideo data if in edit mode
  useEffect(() => {
    if (!isFetchedRef.current) {
      const loadScrollingVideo = async () => {
        try {
          const response = await getScrollingVideoById(Id);

          if (!response.data) {
            console.error('ScrollingVideo data is null or not found');
            return;
          }

          const ScrollingVideo = response.data;
          setFormData({
            Text: ScrollingVideo.Text,
            Video: ScrollingVideo.Video,
            Status: ScrollingVideo.audit.status,
          });
        } catch (err) {
          console.error('Error fetching ScrollingVideo:', err);
        } finally {
          setIsLoading(false);
        }
      };

      if (isEditMode && Id) {
        loadScrollingVideo();
      } else {
        setIsLoading(false);
      }

      isFetchedRef.current = true;
    }
  }, [isEditMode, Id]);

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCancel = () => {
    navigate('/admin/ScrollingVideos');
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      previewFile(file);
    } else {
      alert('Please upload a valid video file.');
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setFormData((prevData) => ({ ...prevData, Video: reader.result }));
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await updateScrollingVideo(Id, formData);
      } else {
        response = await addScrollingVideo(formData);
      }

      if (response && response.data) {
        alert(response.message);
      } else {
        alert('Unexpected response from the server');
      }
      navigate('/admin/ScrollingVideos');
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="pagetitle">
        {isEditMode ? 'Edit ScrollingVideo' : 'Create a New ScrollingVideo'}
      </div>

      <div className="form-800">
        <div className="white-bg">
          <div className="input-form">
            <form onSubmit={handleSubmitFile}>
              <table>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <div className="formlabel">Text</div>
                      <textarea
                        name="Text"
                        value={formData.Text}
                        onChange={handleInputChange}
                        required
                      />
                    </td>

                    <td>
                      <div className="formlabel">Video</div>
                      <input
                        type="file"
                        name="Video"
                        accept="video/*"
                        onChange={handleFileInputChange}
                        required={!isEditMode}
                      />
                      <div className="pt-2">
                        {(previewSource || (isEditMode && formData.Video)) && (
                          <video
                            src={previewSource || formData.Video}
                            controls
                            style={{ height: '180px' }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </td>
                  </tr>

                  {isEditMode && (
                    <tr>
                      <td>
                        <label htmlFor="status">Status:</label>
                        <select
                          name="Status"
                          value={formData.Status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td>
                      <div>
                        <button type="submit" className="button">
                          {isEditMode ? 'Update' : 'Submit'}
                        </button>
                        <button
                          type="button"
                          className="button cancel-button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingVideoForm;
