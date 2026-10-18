use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum DuckingMode {
    Off,
    Minus6dB,
    Minus12dB,
    Minus18dB,
    Minus24dB,
}

impl DuckingMode {
    /// Multiplier applied to ambient volume when ducking is triggered.
    pub fn multiplier(self) -> f32 {
        match self {
            Self::Off => 1.0,
            Self::Minus6dB => 0.501,
            Self::Minus12dB => 0.251,
            Self::Minus18dB => 0.126,
            Self::Minus24dB => 0.063,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChannelState {
    pub sound_id: String,
    pub volume: f32, // 0.0 ..= 1.0
    pub muted: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AmbientConfig {
    pub master_volume: f32,
    pub channels: Vec<ChannelState>,
    pub ducking_mode: DuckingMode,
}

impl Default for AmbientConfig {
    fn default() -> Self {
        Self {
            master_volume: 0.85,
            channels: vec![],
            ducking_mode: DuckingMode::Minus12dB,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PresetConfig {
    pub name: String,
    pub config: AmbientConfig,
}

pub struct AmbientMixer;

impl AmbientMixer {
    /// Calculates effective volume for a channel given ducking and player state.
    pub fn calculate_channel_volume(
        channel: &ChannelState,
        config: &AmbientConfig,
        is_media_playing: bool,
    ) -> f32 {
        if channel.muted {
            return 0.0;
        }

        let base = channel.volume.clamp(0.0, 1.0) * config.master_volume.clamp(0.0, 1.0);
        if is_media_playing {
            base * config.ducking_mode.multiplier()
        } else {
            base
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ducking_attenuation() {
        let channel = ChannelState {
            sound_id: "rain".into(),
            volume: 1.0,
            muted: false,
        };
        let cfg = AmbientConfig {
            master_volume: 1.0,
            channels: vec![channel.clone()],
            ducking_mode: DuckingMode::Minus12dB,
        };

        let normal = AmbientMixer::calculate_channel_volume(&channel, &cfg, false);
        assert!((normal - 1.0).abs() < 1e-4);

        let ducked = AmbientMixer::calculate_channel_volume(&channel, &cfg, true);
        assert!((ducked - 0.251).abs() < 1e-3);
    }
}
