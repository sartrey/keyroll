using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Xml.Linq;

namespace Keyroll.TDS
{
    public class Storage
    {
        private string _Path = null;
        private StorageHeader _Header = null;
        private List<Asset> _Assets 
            = new List<Asset>();

        private Stream _Stream = null;
        private ZipArchive _Archive = null;

        public string Path 
        {
            get { return _Path; }
            set { _Path = value; }
        }

        public List<Asset> Assets
        {
            get { return _Assets; }
        }

        private ZipArchive Archive
        {
            get 
            {
                if (_Archive == null)
                {
                    _Stream = File.Open(_Path, 
                        FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None);
                    _Archive = new ZipArchive(_Stream, ZipArchiveMode.Update, false);
                }
                return _Archive;
            }
        }

        public Asset this[string id]
        {
            get 
            {
                foreach (var asset in _Assets)
                    if (asset.Id == id)
                        return asset;
                return null;
            }
        }

        protected Storage() { }

        private void LoadAssets(XElement xml)
        {
            foreach (var xml_asset in xml.Elements("asset"))
            {
                var asset = Asset.Parse(xml_asset);
                if (asset != null)
                {
                    _Assets.Add(asset);
                    asset.Storage = this;
                }
            }
        }

        private XElement SaveAssets() 
        {
            var xml = new XElement("root");
            foreach (var asset in _Assets)
                xml.Add(asset.ToXML());
            return xml;
        }

        /// <summary>
        /// load storage
        /// </summary>
        public static Storage Load(string path, string key)
        {
            var stream = File.Open(path, FileMode.Open);
            var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            var header_entry = archive.GetEntry("header.xml");
            var header_stream = header_entry.Open();
            var header_xml = XElement.Load(header_stream);
            var header = StorageHeader.Parse(header_xml);

            if (!header.Activate(key))
            {
                header_stream.Close();
                stream.Close();
                archive.Dispose();
                return null;
            }

            var storage = new Storage();
            storage._Path = path;
            storage._Header = header;

            var assets_entry = archive.GetEntry("assets.xml");
            var assets_stream = assets_entry.Open();
            var assets_xml = XElement.Load(assets_stream);
            storage.LoadAssets(assets_xml);

            header_stream.Close();
            assets_stream.Close();
            stream.Close();
            archive.Dispose();
            return storage;
        }

        /// <summary>
        /// create storage instance without physical entity
        /// </summary>
        public static Storage Create(string path, string key)
        {
            var storage = new Storage();
            storage._Path = path;
            var header = new StorageHeader();
            header.SetKey(null, key);
            storage._Header = header;
            if (File.Exists(path))
                File.Delete(path);
            return storage;
        }

        /// <summary>
        /// commit storage changes to device
        /// </summary>
        public void Commit()
        {
            var archive = this.Archive;

            var header_entry = archive.GetEntry("header.xml");
            if (header_entry == null)
                header_entry = archive.CreateEntry("header.xml");
            var header_stream = header_entry.Open();
            var header_xml = _Header.ToXML();
            header_xml.Save(header_stream);
            header_stream.Close();

            var assets_entry = archive.GetEntry("assets.xml");
            if (assets_entry == null)
                assets_entry = archive.CreateEntry("assets.xml");
            var assets_stream = assets_entry.Open();
            var assets_xml = SaveAssets();
            assets_xml.Save(assets_stream);
            assets_stream.SetLength(assets_stream.Position);
            assets_stream.Close();

            Close();
        }

        public void Close()
        {
            if (_Archive != null)
            {
                _Archive.Dispose();
                _Stream.Dispose();
                _Archive = null;
            }
        }

        public IEnumerable<Asset> GetAssetByName(string name) 
        {
            foreach (var asset in _Assets) 
            {
                if (asset.Name == name)
                    yield return asset;
            }
        }

        public IEnumerable<Asset> GetAssetByHash(string hash) 
        {
            foreach (var asset in _Assets)
            {
                if (asset.Hash == hash)
                    yield return asset;
            }
        }

        public void AddAsset(Asset asset)
        {
            asset.Storage = this;
            _Assets.Add(asset);
        }

        public void RemoveAsset(Asset asset)
        {
            asset.Storage = null;
            _Assets.Remove(asset);
        }

        public void AttachEntry(Asset asset, string path)
        {
            var input_stream = File.Open(path, FileMode.Open, FileAccess.Read);
            AttachEntry(asset, input_stream);
            input_stream.Close();
        }

        public void AttachEntry(Asset asset, Stream stream) 
        {
            var archive = this.Archive;
            var entry = archive.GetEntry(asset.ZipPath);
            if (entry == null)
                entry = archive.CreateEntry(asset.ZipPath);
            var entry_stream = entry.Open();
            _Header.AES.Encipher(stream, entry_stream);
            stream.Close();
            entry_stream.SetLength(entry_stream.Position);
            entry_stream.Close();
        }

        public void DetachEntry(Asset asset)
        {
            var archive = this.Archive;
            var entry = archive.GetEntry(asset.ZipPath);
            entry.Delete();
        }

        public void ExportEntry(Asset asset, string path, bool overwrite)
        {
            var archive = this.Archive;
            var entry = archive.GetEntry(asset.ZipPath);
            if (entry == null)
                return;
            var entry_stream = entry.Open();
            var output_stream = File.Open(path, FileMode.OpenOrCreate, FileAccess.Write);
            _Header.AES.Decipher(entry_stream, output_stream);
            entry_stream.Close();
            output_stream.Close();
        }

        public Stream OpenEntry(Asset asset) 
        {
            var archive = this.Archive;
            var entry = archive.GetEntry(asset.ZipPath);
            if (entry == null)
                return null;
            var entry_stream = entry.Open();
            var memory_stream = new MemoryStream();
            _Header.AES.Decipher(entry_stream, memory_stream);
            memory_stream.Position = 0;
            return memory_stream;
        }
    }
}