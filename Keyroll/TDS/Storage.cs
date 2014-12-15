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

        public string Path 
        {
            get { return _Path; }
            set { _Path = value; }
        }

        public List<Asset> Assets
        {
            get { return _Assets; }
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
            var stream = File.Open(_Path, FileMode.OpenOrCreate, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Update);

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

            archive.Dispose();
            stream.Close();
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
            var stream = File.Open(Path, FileMode.Open, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Update);
            var entry = archive.GetEntry(asset.Id);
            if (entry == null)
                entry = archive.CreateEntry(asset.ZipPath);
            var entry_stream = entry.Open();
            var input_stream = File.Open(path, FileMode.Open, FileAccess.Read);
            var aes = _Header.AES;
            aes.Encipher(input_stream, entry_stream);
            aes.Dispose();
            entry_stream.SetLength(entry_stream.Position);

            input_stream.Close();
            entry_stream.Close();
            archive.Dispose();
            stream.Close();
        }

        public void DetachEntry(Asset asset)
        {
            var stream = File.Open(Path, FileMode.Open, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Update);
            var entry = archive.GetEntry(asset.ZipPath);
            entry.Delete();
            archive.Dispose();
            stream.Close();
        }

        public void ExportEntry(Asset asset, string path, bool overwrite)
        {
            var stream = File.Open(Path, FileMode.Open, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            var entry = archive.GetEntry(asset.ZipPath);
            if (entry == null)
                return;
            var entry_stream = entry.Open();
            var output_stream = File.Open(path, FileMode.OpenOrCreate, FileAccess.Write);
            var aes = _Header.AES;
            aes.Decipher(entry_stream, output_stream);
            aes.Dispose();
            entry_stream.Close();
            output_stream.Close();
            archive.Dispose();
            stream.Close();
        }
    }
}